import os
import json

# Save ngrok API response in a file (overwrite)
os.system("curl http://localhost:4040/api/tunnels > tunnels.json")

with open("tunnels.json") as data_file:
    json_data = json.load(data_file)

# Print [Protocol - URL]
for i in json_data["tunnels"]:
    print(f"[{i["proto"]}]: {i["public_url"]}\n")