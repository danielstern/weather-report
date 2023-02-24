# Weather Report!

## https://master.djv39yyvzpo35.amplifyapp.com/

![image](https://user-images.githubusercontent.com/4268152/221254520-482839d9-1c32-477b-9ae1-e2eb93df2d55.png)

## A React Application Created with Vite That Displays Weather Charts

## Usage
1. Clone the repository
```
git clone https://github.com/danielstern/weather-report.git
```

2. Install dependencies
```
npm install
```

3. Run the app using Vite
```
npm run dev
```

4. Open the app to the URL indicated in the terminal.

## A Tour of the App
This is a simple yet modern React application. Interesting parts of the stack include
- Vite + React as the scaffold
- React Material UI to handle interactions and style
- Axios for HTTP requests

It consists of two views (temperature and precipitation) and 3 form controls, used to control data being collected from the API.

## Deployment
The front end of the app is deployed to AWS via Amplify. It is linked to this GitHub and redeploys automatically whenever the Master branch is updated!

![image](https://user-images.githubusercontent.com/4268152/221255855-e4199fc1-49e3-4f50-93f9-11926e1ba282.png)

### Achievements
#### First Ever AWS Deploy
Even though I have quite a bit of experience with Azure and even GCP, I've never deployed an app to AWS. This is my first and I'm happy to say it was successful!

#### No Chart Library
Both charts are made with pure SVG and CSS. We use D3 for a bit of math but not to draw the graphs.

### Limitations and How We Dealt With Them
#### Meteomatics Trial API

#### Fetching Older Data
The trial version of meteomatics only allows weather up to a few days back to be fetched. To fix this, data that is too old to query instead returns spec data

#### Avoiding Unrecognized Coordinates
The API also does not like certain otherwise very valid looking set of geocoordinates - thus, this prototype only has a few cities that are confirmed to work with the API

#### Getting Around CORS Limitations
Meteomatics has CORS disabled - so you can't query it from the front end. To fix this, we set up a proxy on Heroku that has CORS enabled.  🤠

#### Interacting with the Charts
On PC, it seems very intuitive to hover over a bar to get more information. But on mobile, it's much less intuitive, as there is no hover, and also the space is limited. To get around this and to save time, we've omitted interacting with the chart elements until scope is better defined

## About the UX/UI
For any sort of basic component, like a date select, we went with the default offered by Material UI. In addition to being highly cost and time effective, it's always a good idea to use the industry standard. If this was a real project and we hired a few junior devs, they would only need to ramp up on Material UI itself in order to begin maintaining the app.

## Directory Structure
All important files are contained in the `/src` directory and will be familiar to any users of Vite.

For the tables, we went with simplicicity and ease of use. We avoided unecessary decorations, focusing instead on a sense of gestalt. White space is employed generously.
