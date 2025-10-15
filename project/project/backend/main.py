# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predict import predict_materials

app = FastAPI(title="POWERGRID Material Forecast API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ProjectInput(BaseModel):
    budget: float
    location: str
    tower_type: str
    substation_type: str
    terrain: str
    tax: float

@app.post("/predict")
def get_prediction(input: ProjectInput):
    print("Received input:", input)
    result = predict_materials(
        budget=input.budget,
        location=input.location,
        tower_type=input.tower_type,
        substation_type=input.substation_type,
        terrain=input.terrain,
        tax=input.tax
    )
    print("Prediction result:", result)
    return {"predictions": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
