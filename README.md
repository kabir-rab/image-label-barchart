# image-label-bar-chart
This is a Qlik Sense bar chart extension example. This extension is supposed to be only an example and can/will work on production environment, however this is not fully polished (need to introduce resize rather than drawing the chart on all change/resize events). This chart allows custom colouring of the bars (one colour or multiple colours based on expression). Also allows chart background colour option.


_IMPORTANT! This was developed for a specific use case - used in a data literacy project! This may not be supported going forward._

# Why...?
This was developed for a personal project. was used to display use profile picture from twitter/fb and for for gamer tags with the bar chart. 

# Demo
<p align="center">
  <img width="90%" alt="variable Manager in action" src="https://github.com/kabir-rab/image-label-barchart/blob/master/lib/img/image-label-barchart.gif">
</p>

# How to Install
## Desktop
Download this repo as .zip file. Once downloaded unzip all its content to the following folder 
> Documents\Qlik\Sense\Extensions\

## Enterprise Server
Download this repo as .zip file. Once downloaded, use the QMC to upload the zip file just like any other extensions.

# How to use
Go to "edit" mode of a Qlik sense app. Then Custom objects > "Kab-s Game Example Bundle" > Game-KPI. Drag this to the work space and select your Dimension and Measure. For avatar to work - you will have to upload them in the content library and provide the address for each image for each dimension using a mapping table (see the screenshot below for an example mapping table). Images can be displayed from other internet sources too (ex - twitter profile picture etc).
<p align="center">
  <img width="90%" alt="variable Manager in action" src="https://github.com/kabir-rab/image-label-barchart/blob/master/lib/img/mapping.png">
</p>

To change/control the bar colours - change the option under "Dimension". you can write colour expression or just set one colour, ex #000 (for black) etc.
```javascript
=IF(SUM(measure1) > 3, '#AE1C3E', 
	IF(SUM(measure1) > 1, '#4477AA', '#0AAF54')
)
```
