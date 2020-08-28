import logging
import os

log_file_path = os.path.dirname(os.path.abspath(__file__))
log_file_name = log_file_path + "\\" + "assignment.log"
# logging.basicConfig(level=logging.INFO)
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger("atria_assignment")
logger.setLevel(logging.ERROR)
fh = logging.FileHandler(log_file_name)
logger.addHandler(fh)
