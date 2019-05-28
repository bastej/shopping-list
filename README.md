# React(Redux) App | Shopping list + nutrients calculator

demo: https://bastej.github.io/shopping-list/

Application connected to the Nutritionix API v2

App that allows you to save shopping lists, useful for people who focus on the nutrients values of products. App is consistently improved, at the moment allows you to save shopping lists and add products from Nutritionix API that contains a huge database of diffrent products and theirs nutrients info - 591,427 items from 29,638 grocery brands and 27,285 common foods.


# Components structure

## List Components:
Here is one parent component named **List**(that contain few specific Components e.g. ListCreator), and two child components: **Cart** and **Meal** who are diffrent type of list.

To render specific list, for example **Cart**, app use **ListCreator** Component and just passing specific props for **Cart**. Similary if rendering **CartCreate** that is create cart view, app use **ListCreate** Component and passing specific props. 