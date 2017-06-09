# CodeUp

> A networking application where people of similar software interests can learn, collaborate and connect.

## Team

  - __Product Owner__: Trace Baxter
  - __Scrum Master__: Adam Alcott
  - __Development Team Members__: Doris Chiu, Rodolfo Rodriguez, Guillermo Blanco

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> To login to codeUp, go to the landing page and click the GitHub icon to login using your GitHub credentials. Upon successful login, you will be greeted by all the upcoming local events in your area. If you select the user icon in the top right, you can view your own profile in order to edit your current skillsets as well as skills you would like to develop. By clicking on the Explore icon next to the User icon, you can return to the Events/Users/Maps page. On the Events page, browse events and select drop-down icons to reveal more details. Some events are marked as private and the moderator will need to be contacted for location information. You can pin events that interest you and view your pinned events by clicking the My Pinned icon. In that section, you can also find the Add Event icon where you can create your own events. You can view all created events by selecting the My Events icon and edit/delete each event. If you select the Map heading at the top, you will be taken to a map displaying the locations of all public events as well as a list of the corresponding events in the sidebar.  By clicking the Users heading, you can view all registered users of the app. Select a user to view their profile where you can endorse them or message them to begin a conversation using our chat feature, which can be accessed in the bottom right corner. Going back to the Explore page, you can use the search bar at the top to search users and events by languages, skills, location, or username. 

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

>$ npm install

Then in seperate terminals run:

>$ npm start

>$ npm run webpack

These commands start your server using nodemon, start the mongodb and start webpack in watch mode.  Now your app lives on your localhost port 3034. Have fun!

### Roadmap

View the project roadmap [here](https://github.com/Henriettas-Army/CodeUp/issues)


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
