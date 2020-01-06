#myGarden Website
by Rebecca Evans

This is a website designed to allow garden enthusiasts in the Northwest to login, add their favorite plants to their garden and share their garden to the community.

There will be the following pages:

-Home Page
-Login Page
-Signup Page
-Plant Lookup or Browse Page with ability to add a plant
-Garden Lookup page with ability to search by user or plant
-My Garden page where users can save their favorite plants, create a 'garden' and add plants to that garden

The *user* model will include the following fields:

-first name
-last name
-email address
-usda climate zone
-favorite plant list
-garden name

The *plant* model will include:

-plant name, common
-plant name, latin
-plant type
-plant picture url
-plant culture needs
-plant uses

I plan on scraping the Great Plant Picks website for an initial list of plants to population the database, but users will be able to add a plant if they'd like.

The *garden* model will include:

-garden name
-garden location
-garden aspect (south facing, shady, wet, dry, etc.)	
-list of plants including a field with the number of plants

***

## Plan of Action

1.	Create initial files and install initial dependencies
2.	Create and style initial pages
3.	Create db and models
4.	Begin coding routes, controllers, etc.



Color Scheme:

Blue: #22265d
rich blue: #1f3943
Green: 2f4e24
light blue: #5c7971
pink: #702659
very light pink: #d9c3c6

