import torch
import torch.nn as nn

# Load PyTorch GNN model
model = torch.load("gnn_model.pt", map_location="cpu")
model.eval()

# Example dummy input (depends on your model!)
# Let's assume your GNN takes a vector of size 32
dummy = torch.randn(1, 32)

torch.onnx.export(
    model,
    dummy,
    "gnn_model.onnx",
    input_names=["input"],
    output_names=["output"],
    opset_version=17
)

print("Export complete → gnn_model.onnx")
