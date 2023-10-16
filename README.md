# GearOnTheGo

**Roles:**

Team Leader: Samantha Mathis

Requirements Leader: Saahil Vashishta

QA Leader: Lazaro Perez

Design and Implementation Leader: Jian Song

Security Leader: Ahnaf Tajwar

Configuration Leader: Shajee ur Rehman 

**Summary:**

Our project is a recreational equipment rental service web application. Our vision is to align people who are in need of these recreational equipments, examples include(canoes, kayaks, mountain bikes, boats, jet skis etc), with people who have the equipment readily available for others to use for a specified time. The functionality of the site is to allow users to choose items that are posted by individuals in their vicinity who need these items.

****

**How to:**

Instructions to set up Flask

* `cd code/Backend/flask-backend`

* `pip install -r ../requirements.txt`
* `Python3 app.py`


Instructions to set up React

* `cd code/Frontend/react-frontend`

* If Nodejs is not Installed:

     * `Download nodejs from nodejs.org`

* If Nodejs is Installed but not npm:

     * `npm install`

* If Nodejs and npm is installed:

     * `npm start`

* To run everything locally (backend + frontend)
     * Start virtual environment
          * `python -m venv env`
          * `source env/bin/activate`
     * Install required packages: `pip install -r requirements.txt`
     * Build frontend
          * Go to frontend source code: `cd /code/Frontend/react-frontened`
          * `npm run build`
     * Run service
          * Change directory to repo root: `cd ../../..`
          * `gunicorn --chdir ./code/Backend/flask-backend app:app`
     * Nagivate to https://127.0.0.1:8000/


