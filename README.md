# About

Tooltip-based guide framework able to work on top of any web application.

![center](https://raw.githubusercontent.com/lemondemon/tiptop/master/tiptop.gif)

## Installation


1. download this repository to the project folder 
1. use bower: bower install tiptop 


## Step by step


1. add style 

		<link rel="stylesheet" href="tiptop.css">

2. add js

		<script type="text/javascript" src="tiptop.js"></script>

3.  initiate tiptop with parametres

		tiptop.init();

## Configuration

**Example 1**

Use only title and text

	tiptop.init({
		tips: {
			'#tip': {
				title: 'tytuł 1',
				text: 'text1'
			},
			'#tip': {
				title: 'tytuł 1',
				text: 'text1'
			}
		}
	});
	
**Example 2** 

Set additional options for chosen tiptops 


	tiptop.init({
		tips: {
			'#tip': {
				position: 'bc',
				title: 'tytuł 1',
				text: 'text1'
			},
			'#tip': {
				title: 'tytuł 1',
				text: 'text1',
				showOnInit: true
			}
		}
	});
	
**Example 3**

Change options for all tiptops 


	tiptop.init({
		tips: {
			'#tip': {
				position: 'bc',
				title: 'tytuł 1',
				text: 'text1'
			},
			'#tip': {
				title: 'tytuł 1',
				text: 'text1',
				showOnInit: true
			}
		},
		options: {
			dotSize: 10
		}
	});


Available options:

* position - enables to set the dot's position. This position predetermines the popup's position in relation to the element. 
	* tl - top left
	* tc - top center
	* tr - top right
	* cl - center left
	* cr - center right
	* bl - bottom left
	* bc - bottom center
	* br - bottom right

* hoffset - enables moving dot's position in the horizontal axis 
* voffset - enables moving dot's position in the vertical axis 
* dotSize - size of the dot
* hoverSize - size of the hover 
* showOnInit - if true tooltip will be shown by default 



## Methods

1. tiptop.toggle() - hides/shows all tiptops (dots wszystkie tiptopy (kropki)
2. tiptop.destroy() - deletes all tiptops

## Appearance change

Tooltip's appearance is changeble using saas variables available in **sass/_theme_default.scss** file.