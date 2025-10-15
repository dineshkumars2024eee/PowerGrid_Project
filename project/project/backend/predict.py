# predict.py
import numpy as np

location_mapping = {
    'Delhi': 0, 'Gujarat': 1, 'Karnataka': 2, 'Kerala': 3,
    'Madhya Pradesh': 4, 'Maharashtra': 5, 'Odisha': 6,
    'Rajasthan': 7, 'Tamil Nadu': 8, 'Telangana': 9
}

tower_mapping = {'132kV': 0, '220kV': 1, '400kV': 2}
substation_mapping = {'AIS': 0, 'GIS': 1}
terrain_mapping = {'Coastal': 0, 'Hilly': 1, 'Mountain': 2, 'Plain': 3}

def predict_materials(budget, location, tower_type, substation_type, terrain, tax):
    """
    Predict material requirements based on project input.
    Uses a simple formula + random variation for prototype.
    """

    try:
        if location not in location_mapping:
            location = "Delhi"
        if tower_type not in tower_mapping:
            tower_type = "132kV"
        if substation_type not in substation_mapping:
            substation_type = "AIS"
        if terrain not in terrain_mapping:
            terrain = "Plain"

        steel = budget * 10 + np.random.rand() * 5
        cement = budget * 7 + np.random.rand() * 5
        insulators = budget * 20 + np.random.rand() * 10

        return {
            "Steel (tons)": round(steel, 2),
            "Cement (tons)": round(cement, 2),
            "Insulators (units)": round(insulators, 2)
        }

    except Exception as e:
        print("❌ Error in prediction:", e)
        return {
            "Steel (tons)": 0,
            "Cement (tons)": 0,
            "Insulators (units)": 0
        }


if __name__ == "__main__":
    sample = predict_materials(12, "Maharashtra", "400kV", "GIS", "Plain", 18)
    print("🔮 Sample Prediction:", sample)
