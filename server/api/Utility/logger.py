import logging
import os

def create_logger(log_file="../logs/Debug.log", log_level=logging.INFO):
    # Ensure the log directory exists
    log_dir = os.path.dirname(log_file)
    if not os.path.exists(log_dir) and log_dir != '':
        os.makedirs(log_dir)  # Create the directory if it doesn't exist

    # Configure logging
    logging.basicConfig(
        filename=log_file,
        level=log_level,
        format="%(asctime)s - %(levelname)s - %(message)s"
    )
    
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.WARNING)
    
    return logging.getLogger()
