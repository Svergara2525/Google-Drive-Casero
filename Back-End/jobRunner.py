import os
import subprocess
from datetime import datetime
import threading

output_folder = 'output'

def run_job(job_name, job_params):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    job_path = os.path.join('jobs', f"{job_name}.py")

    if not os.path.isfile(job_path):
        raise ValueError(f"Job {job_name} not found")

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    stdout_file = os.path.join(output_folder, f"{job_name}_{timestamp}_stdout.txt")
    stderr_file = os.path.join(output_folder, f"{job_name}_{timestamp}_stderr.txt")

    print(f"Running job: {job_path} with parameters: {' '.join(job_params)}")
    with open(stdout_file, 'w') as out, open(stderr_file, 'w') as err:
        process = subprocess.Popen(['python', job_path] + list(map(str, job_params)), stdout=out, stderr=err)
        process.communicate()
    print(f"Job {job_path} finished")

def run_jobs_and_save_output(job_name, job_params):
    job_thread = threading.Thread(target=run_job, args=(job_name, job_params))
    job_thread.start()
    print(f"Job {job_name} has been started in the background")

