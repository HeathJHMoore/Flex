# FLEX Workout Program Application
FLEX is a Web Based Mobile Phone Application designed to help users easily implement the principle of progressive overload into their workout routines. All effective workout programs should implement this principle but, unfortunately, very few do. My goal for this application was to automate the implementation of progressive overload in workout routines so that myself and other gym-goers can free our minds of worrying about it

## Technologies Used
* Javascript - React Framework
* CSS
* HTML
* Firebase

## Deployed Link

[Check Out The Flex Application Here](https://flex-fdc46.web.app/auth)

# What is Progressive Overload and Why is it important?
In order for muscles to grow in size and strength, you must consistently expose them to incrementally higher resistance (AKA lift more weight) and volume (AKA complete more repetitions). Many people fail to realize the importance of this principle, and, as result, see a sharp plateau in their strength and size gains over time. This experience is frustrating and demoralizing as you feel like all of your hard work in the gym is being done in vain. For some, the frustration of plateuaing can lead to halting exercise altogether, which is the last thing we want to happen. So, in an effort to take the headache and effort out of incorporating progressive overload into your own workouts, I built an application that will do it for you!


# How the application works
Start by creating a user account on the sign-on landing page. This step is made easy by using your google acccount for authentication!

After logging in, you are taken to the "My Dashboard" page where you can see all of your workout routines. You obviously won't have any routines yet so lets go ahead and make your first workout routine by clicking the orange "Create A New Workout" button.

![My Dashboard Page](https://raw.githubusercontent.com/HeathJHMoore/Flex/master/images/My-Dashboard.png)

### -Create your first workout-
You should now be on the Create New Workout page where you can name your workout and begin adding exercises to it. Go ahead and create a name for your first workout and then click the orange "Add An Exercise" button to start adding exercises

![Create a New Workout Page](https://raw.githubusercontent.com/HeathJHMoore/Flex/master/images/Create-Workout.png)

After clicking the "Add An Exercise" button, a modal should pop up on your screen allowing you to choose an exercise as well as the weight and repetitions you can currently complete for said exercise. Click the "Submit Exercise" button after filling out your exercise information and you should now see your newly created exercise displayed on screen. If you want to delete this exercise, click the black "X" located to the right of the screen. If you want to update this exercise, click the black Pencil Icon also located to the right of the screen. Complete this process for each exercise of your workout routine and then click "Submit Workout". This will take you back to the My Dashboard page where you can see your newly created workout.

![Add Exercise Modal](https://raw.githubusercontent.com/HeathJHMoore/Flex/master/images/Add-Exercise.png) ![Create Workout Page-2](https://raw.githubusercontent.com/HeathJHMoore/Flex/master/images/Create-Workout-2.png)

### -Log a workout attempt-
Now that you've created a workout routine, you can start logging each attempt you make at completing it. FLEX will use your performance on each workout attempt to determine how much weight/how many repetitions should be added to your exercises for your next attempt. 

To log a workout attempt, click the "New Attempt" button located on your workout card on the My Dashboard page. This will take you to the "Submit Workout" page where you will see each exercise in the workout displayed as a drop down menu. In each of these dropdowns, you will record the number of repetitions you completed for each set of the exercise and click the orange "Save" button to save your performance. After completing this for all exercises, click the orange "Submit Workout" button at the bottom of the page to log your entire performance to the database.

### -Automating Progressive Overload--
At this point, my application automates the implementation of progressive overload by analyzing your performance on your submitted workout and adjusting your future weights/repetitions accordingly. If you successfully complete the prescribed weight and volume for an exercise, FLEX will either add repetitions or weight for your next attempt at the workout. If you fail to meet the prescribed weight and repetitions, FLEX will keep your weight and repetitions the same for your next workout.


### -Workout Analytics--


