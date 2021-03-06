# NewXKCD

> visually improved [XKCD](https://xkcd.com)

# Build Setup

## Install dependencies
This project is only maintained for Ubuntu 18.04 right now, any contribution or feedback is really much appreciated.

Make sure your node version is up to date, else it will stop the script from starting.

You will need to install cURL:

```sudo apt-get upgrade; sudo apt-get install curl```

and Yarn or NPM:

Yarn (make sure you do both commands for yarn at the same time, otherwise it won't install):
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

```sudo apt-get update; sudo apt-get install yarn```

NPM:

```sudo apt-get install npm```

Then, just type ```cd NewXKCD``` to go in the cloned repository.

You will need to have vue js installed, type ```npm install vue```

## Launch the app
To launch the app, just type ```./start``` in your terminal. Then you will see a small window where there is written "listenin on: [ip-adress]". You just have to ctrl+click on the adress or copy it in your favorite browser. This will get you on the website.

You may have to refresh the page after a few seconds to let yarn the time needed to start, if it didn't show you the page directly.

If you wish to do it yourself as a **"true coder"**, you can still type ```HOST=0.0.0.0 yarn dev; sensible-browser http://10.101.52.143:3000/```

## Use the website

Using the website, you should avoid to click too quickly on the next and previous page button.

This is because XKCD's API allows only a certain number of requests in a certain amount of time, making it easily overflowed.

Also, you should wait for the image to completely load before clicking on next or previous, or at least charge the title and text. This way you won't overflow the API.

### Sidenotes

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org) or send an email to alec.ferrari.pro@gmail.com.

The code made here is the entire property of Primarter aka Alec Ferrari and shall not be used commercially. However, the images, descriptions, and titles are licensed to XKCD. For more information, check out [their website](https://xkcd.com). 

For any request about the project, send an email to alec.ferrari.pro@gmail.com