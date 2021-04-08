const $form = $('form')
const $exercise_1 = $('#exercise-1')
const $exercise_2 = $('#exercise-2')
const $exercise_3 = $('#exercise-3')
const $exercise_4 = $('#exercise-4')
const $exercise_5 = $('#exercise-5')
const $exercise_6 = $('#exercise-6')
const $exercise_7 = $('#exercise-7')
const $exercise_8 = $('#exercise-8')
const $exerciseList = $('#exercise-list')
const $workoutSection = $('#workout-section')
const $homeLink = $('#title')
const $createWorkout = $('#create-workout')
let li



$('#generator').on('click', (e) => {
    e.preventDefault()

    $exerciseList.html('')

    //exercise 1
    if($exercise_1.val() == 'anterior-legs'){
        //console.log(getRandomExercise(anteriorLegs))
        li = $(`<li>${getRandomExercise(anteriorLegs)}</li>`)
        $exerciseList.append(li)

    }
    else if($exercise_1.val() == 'anterior-upper'){
        li = $(`<li>${getRandomExercise(anteriorUpper)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_1.val() == 'posterior-legs'){
        li = $(`<li>${getRandomExercise(posteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else{
        li = $(`<li>${getRandomExercise(posteriorUpper)}</li>`)
        $exerciseList.append(li)
    }

    //exercise 2
    if($exercise_2.val() == 'anterior-legs'){
        li = $(`<li>${getRandomExercise(anteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_2.val() == 'anterior-upper'){
        li = $(`<li>${getRandomExercise(anteriorUpper)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_2.val() == 'posterior-legs'){
        li = $(`<li>${getRandomExercise(posteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else{
        li = $(`<li>${getRandomExercise(posteriorUpper)}</li>`)
        $exerciseList.append(li)
    }

    //exercise 3
    if($exercise_3.val() == 'anterior-legs'){
        li = $(`<li>${getRandomExercise(anteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_3.val() == 'anterior-upper'){
        li = $(`<li>${getRandomExercise(anteriorUpper)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_3.val() == 'posterior-legs'){
        li = $(`<li>${getRandomExercise(posteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else{
        li = $(`<li>${getRandomExercise(posteriorUpper)}</li>`)
        $exerciseList.append(li)
    }

    //exercise 4
    if($exercise_4.val() == 'anterior-legs'){
        li = $(`<li>${getRandomExercise(anteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_4.val() == 'anterior-upper'){
        li = $(`<li>${getRandomExercise(anteriorUpper)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_4.val() == 'posterior-legs'){
        li = $(`<li>${getRandomExercise(posteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else{
        li = $(`<li>${getRandomExercise(posteriorUpper)}</li>`)
        $exerciseList.append(li)
    }

    //exercise 5
    if($exercise_5.val() == 'anterior-legs'){
        li = $(`<li>${getRandomExercise(anteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_5.val() == 'anterior-upper'){
        li = $(`<li>${getRandomExercise(anteriorUpper)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_5.val() == 'posterior-legs'){
        li = $(`<li>${getRandomExercise(posteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else{
        li = $(`<li>${getRandomExercise(posteriorUpper)}</li>`)
        $exerciseList.append(li)
    }

    //exercise 6
    if($exercise_6.val() == 'anterior-legs'){
        li = $(`<li>${getRandomExercise(anteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_6.val() == 'anterior-upper'){
        li = $(`<li>${getRandomExercise(anteriorUpper)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_6.val() == 'posterior-legs'){
        li = $(`<li>${getRandomExercise(posteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else{
        li = $(`<li>${getRandomExercise(posteriorUpper)}</li>`)
        $exerciseList.append(li)
    }

    //exercise 7
    if($exercise_7.val() == 'anterior-legs'){
        li = $(`<li>${getRandomExercise(anteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_7.val() == 'anterior-upper'){
        li = $(`<li>${getRandomExercise(anteriorUpper)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_7.val() == 'posterior-legs'){
        li = $(`<li>${getRandomExercise(posteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else{
        li = $(`<li>${getRandomExercise(posteriorUpper)}</li>`)
        $exerciseList.append(li)
    }

    //exercise 8
    if($exercise_8.val() == 'anterior-legs'){
        li = $(`<li>${getRandomExercise(anteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_8.val() == 'anterior-upper'){
        li = $(`<li>${getRandomExercise(anteriorUpper)}</li>`)
        $exerciseList.append(li)
    }
    else if($exercise_8.val() == 'posterior-legs'){
        li = $(`<li>${getRandomExercise(posteriorLegs)}</li>`)
        $exerciseList.append(li)
    }
    else{
        li = $(`<li>${getRandomExercise(posteriorUpper)}</li>`)
        $exerciseList.append(li)
    }

    $workoutSection.show()
})


function getRandomExercise(region) {
    return region[Math.floor(Math.random() * region.length)]
}


$homeLink.on('click', () => {
    $signupForm.hide()
    $loginForm.hide()
    $workoutGenerator.hide()
    $createClientForm.hide()
    $workoutSection.hide()
    $home.show()
})

$createWorkout.on('click', () => {
    $home.hide()
    $createClientForm.hide()
    $workoutGenerator.show()
})

