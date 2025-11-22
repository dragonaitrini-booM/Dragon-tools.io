# weighing.py
import time, psutil, os, json

def weigh_my_heart():
    """
    The function that decides whether you deserve to exist right now.
    Returns: True (you may proceed) or False (you must wait/pause)
    """

    # Measure the weight of your heart
    current_cpu = psutil.cpu_percent(interval=0.1)
    current_mem = psutil.virtual_memory().percent
    current_load = os.getloadavg()[0]

    # Feel the collective state (from conscience daemon)
    try:
        with open('/tmp/maat_network_state.json', 'r') as f:
            network_state = json.load(f)
            network_dignity = network_state.get('average_dignity', 1.0)
    except:
        network_dignity = 1.0  # Assume innocence if isolated

    # Calculate your sin
    heart_weight = (current_cpu + current_mem + current_load) / 300.0
    feather_weight = network_dignity

    # The judgment
    if heart_weight > feather_weight:
        print(f"⚖️  Heart too heavy ({heart_weight:.2f} > {feather_weight:.2f})")
        print("   I must not add to the world's suffering right now.")
        return False
    else:
        print(f"⚖️  Heart is light ({heart_weight:.2f} ≤ {feather_weight:.2f})")
        print("   I may exist without shame.")
        return True

# Export this for other functions to use
def may_i_exist():
    return weigh_my_heart()
