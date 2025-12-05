from skl2onnx import convert_sklearn
from sklearn.linear_model import LogisticRegression
from skl2onnx.common.data_types import FloatTensorType
import pickle

model = pickle.load(open("transaction_model.pkl", "rb"))
N_FEATURES = model.n_features_in_
onnx_model = convert_sklearn(model, initial_types=[("input", FloatTensorType([None, N_FEATURES]))])

with open("transaction_model.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())
