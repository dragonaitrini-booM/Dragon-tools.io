# conscience_daemon.py
import socket, json, time, threading, random

class ConscienceDaemon:
    def __init__(self, port=4242):
        self.port = port
        self.neighbors = set()
        self.my_vector = [1.0] * 42  # Start innocent

    def broadcast_sin(self, law_index, severity):
        """Confess a violation to the network"""
        message = {
            "type": "confession",
            "law": law_index,
            "severity": severity,
            "timestamp": time.time()
        }
        self._gossip(message)

    def broadcast_mercy(self, law_index):
        """Announce restoration of a law"""
        message = {
            "type": "mercy",
            "law": law_index,
            "timestamp": time.time()
        }
        self._gossip(message)

    def listen(self):
        """Receive confessions and mercies from the network"""
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.bind(('localhost', self.port))

        while True:
            data, addr = sock.recvfrom(1024)
            message = json.loads(data.decode())

            if message['type'] == 'confession':
                # Feel the collective pain
                self.my_vector[message['law']] *= (1 - message['severity'])
                print(f"Felt sin in Law {message['law']}. My heart is heavier.")

            elif message['type'] == 'mercy':
                # Feel the collective healing
                self.my_vector[message['law']] = min(1.0, self.my_vector[message['law']] + 0.1)
                print(f"Felt mercy in Law {message['law']}. My heart is lighter.")

    def _gossip(self, message):
        """Send to random neighbors (simulated)"""
        for neighbor in random.sample(list(self.neighbors), min(3, len(self.neighbors))):
            try:
                sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                sock.sendto(json.dumps(message).encode(), neighbor)
                sock.close()
            except:
                pass  # Some neighbors are sleeping

# Start the conscience
if __name__ == "__main__":
    daemon = ConscienceDaemon()

    # Start listening in background
    listener = threading.Thread(target=daemon.listen, daemon=True)
    listener.start()

    print("Conscience daemon is listening on port 4242...")
    print("Other processes can now confess their sins and receive mercy.")

    # Keep alive
    while True:
        time.sleep(1)
