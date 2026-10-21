from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import argparse
p=argparse.ArgumentParser();p.add_argument("--port",type=int,default=4174);a=p.parse_args()
print(f"ClinicianFile homepage design: http://127.0.0.1:{a.port}",flush=True)
ThreadingHTTPServer(("127.0.0.1",a.port),partial(SimpleHTTPRequestHandler,directory=str(Path(__file__).resolve().parent))).serve_forever()
