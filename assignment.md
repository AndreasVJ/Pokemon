# Home assignment

Create a small application that shows information about pokemons in a table.
Information about pokemons can be retrived from [pokeapi](https://pokeapi.co/).
You are free to use whatever technology and frameworks you would like, if you don't know where to start there are some pointers in the _Tips_ section below.

## Functional requirements

When finished, the application should:

- Allow a user to see a table with basic information about pokemons
- Allow a user to select a specific pokemon and se some more detailed information

Some areas are have more specifications below.

### Table

The column of the table should be dynamic and support showing the following attributes from each pokemon

- Name
- Picture
- Id
- Weight
- Height
- Types

Id and Name is mandatory and should always be shown, while a user should be able to configure if the other columns should be displayed or not. Configuration should be persistent through page reloads.

### Selected pokemon

It should be possible for a user to obtain detailed stats(hp, defence, attack etc) about each pokemon in the table by selecting it. The detailed information about the selected pokemon should be displayed in a suitable manner. The selected pokemon in the table should be highlighted.

The user should be able to change the selected pokemon by the following methods:

- Clicking a new row in the table
- Using the up/down arrows on the keyboard, selecting the previous/next entry in the table based on the current state

## Technical requirements

1. Application must contain a README.md file with instructions on how to start it
2. Application must be written in [TypeScript](https://www.typescriptlang.org/) and compile without errors

We would like to see components/logic that is written in a way which makes them extendable and easy to unit test.
Consider testability of you code.
(Optional) Illustrate this by including at least some degree of testing.

# Tips

**Getting started**
If you have no opinion on where to start. [Create React App](https://create-react-app.dev/docs/adding-typescript/#installation) is a kit which gives you a starting point for a frontend application.

## Libraries

You are free to use any library that you see fit. If you have no opinions below is a list of some of the libraries we use.

| Library                                                                | Description                                                                    |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Material UI](https://mui.com/core/)                                   | Component library based on Google's [Material Design](https://m2.material.io/) |
| [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview) | Library for managing data fetching, including query state and caching.         |
|                                                                        |                                                                                |
