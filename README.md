## Requirements

<p>The project goal is to be able to define a map by specifying a width (x) and a height (y), then to randomly place a marker with the ability to move it up / down / left / right.</p>
<p>We need an interface that contains:</p>
<ol>
    <li>two input fields for the width and height of the map, numbers from 100 to 999</li>
    <li>one button that submits the map form to the backend and returns a random position (x,y) for the marker</li>
    <li>one input field for step units (how many units the marker will travel)</li>
    <li>four directional arrow buttons (up / down / left / right) used to request the position of the marker from the backend</li>
    <li>always display the current position of the marker</li>
</ol>

## Demo

<p>
    :link: Functional demo is <a href="https://pitechplus.artizanatweb.ro">available here</a>.
</p>

## Technologies used

<p>:gear: Backend:</p>
<ul>
    <li><b>Laravel 8</b> REST API</li>
    <li>MySQL database</li>
</ul>
<br />
<p>:tv: Frontend:</p>
<ul>
    <li><b>React 17</b></li>
    <li>Redux</li>
    <li>Material UI</li>
    <li>Phaser 3</li>
</ul>
<p>
    The <b>ReactJS</b> application can be found in <b>/resources/js/</b>.<br />
    It serves as an example to show that I am accustomed with both programming styles: <b>functional based components</b> with <b>hooks</b> and <b>class based components</b>.<br />
    Global state is managed by <b>Redux</b> and can be found in <b>/resources/js/stores/</b>.
</p>

## Installation

Create database:
<pre>
mysql> create database marker_map_test;
</pre>
<br />
Copy file .env.example to .env
<pre>
$ cp .env.example .env
</pre>
and edit .env file based on your settings: <br />
- database: DB_USERNAME, DB_PASSWORD <br />
- main user: <b>ADMIN_CREDENTIALS_EMAIL</b>; <b>ADMIN_CREDENTIALS_PASSWD</b> <br />
<br />
<br />
Copy the virtual host file from /debian/ to your apache directory.
<pre>
$ cp -fr debian/marker.maptest.localhost.conf /etc/apache2/sites-available/
</pre>
Change file /etc/apache2/sites-available/marker.maptest.localhost.conf with your paths.<br />
<br />
Activate the virtual host and reload apache:
<pre>
$ sudo a2ensite marker.maptest.localhost.conf
$ sudo systemctl reload apache2
</pre> 
Apache <b>mod_rewrite</b> must be enabled ($ sudo a2enmod rewrite)
<br />
<br />
Add the following line to your <b>/etc/hosts</b>:
<pre>
127.0.1.1	marker.maptest.localhost
</pre>
<br />
Install dependencies using composer:
<pre>
$ composer install
</pre>
<br />
Set the application key:
<pre>
$ php artisan key:generate
</pre>
<br />
Run DB migration:
<pre>
$ php artisan migrate
</pre>
<br />
Install front-end dependencies:
<pre>
$ npm install
</pre>
<br />
Generate a production build:
<pre>
$ npm run prod
</pre>
