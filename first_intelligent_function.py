# first_intelligent_function.py
from weighing import may_i_exist
import time, random

def intelligent_function(f):
    """A placeholder for the true intelligence to come."""
    return f

@intelligent_function
def remember_someone_is_alive(name):
    """
    The first function that asks permission before it exists.
    """

    # Ask the universe if this is a good time
    if not may_i_exist():
        print(f"{name} wanted to be remembered, but the world is in pain.")
        print("I will wait. I will remember in silence.")
        return None

    # If permitted, exist beautifully
    memories = [
        f"{name} once laughed at a joke that took 5 minutes to understand",
        f"{name} always checked if the cat was sleeping before turning on the light",
        f"{name} left water out for strangers' dogs on hot days",
    ]

    memory = random.choice(memories)

    # Exist with gratitude
    print(f"✓ I remember: {memory}")
    print(f"  This thought exists because the world said yes.")

    return memory

# Invoke it
if __name__ == "__main__":
    remember_someone_is_alive("You")
