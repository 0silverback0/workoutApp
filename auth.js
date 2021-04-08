const $signupForm = $('#signup-form')
let $userDisplayName
const $clientsOptions = $('#clients')
const $home = $('#home')
let $clientName = ''
const $viewWorkouts = $('#view-workouts')

 //signup
 const $signupLink = $('#signup')
 $signupLink.on('click', () => {
     $signupForm.show()
     $loginForm.hide()
     $home.hide()
 })
 
 $signupForm.on('submit', (e) => {
     e.preventDefault()
 
     let email = $('#signup-email').val()
     let name = $('#signup-name').val()
     let password = $('#signup-password').val()
 
     
     auth.createUserWithEmailAndPassword(email, password).then((cred) => {
         //sets display name upon sign up
         cred.user.updateProfile({
             displayName: name
         })
         // creates new doc in trainers collection for each trainer
         db.collection('trainers').doc(name).set({name})
         //db.collection('trainers').doc(name).collection('clients').doc('dummy').set({name: 'dummy'})
     })
        
        $userDisplayName = name
        console.log($userDisplayName)
        $signupForm.trigger('reset')
        $exerciseList.show()
 })
 
 //logout
 const $logoutLink = $('#logout')
 
 $logoutLink.on('click', (e) => {
     e.preventDefault()
     $exerciseList.hide()
     auth.signOut()
     $createClientForm.hide()
     $home.show()
 })
 
 //login
 const $loginLink = $('#login')
 const $loginForm = $('#login-form')
 
 $loginLink.on('click', () => {
     $loginForm.show()
     $signupForm.hide()
     $home.hide()
 })
 
 $loginForm.on('submit', (e) => {
     e.preventDefault()
 
     let email = $('#login-email').val()
     let password = $("#login-password").val()
 
     auth.signInWithEmailAndPassword(email, password).then(cred => {
        $userDisplayName = cred.user.displayName
         $loginForm.hide()
         $exerciseList.show()
     })
     $loginForm.trigger('reset')
 })
 
 //create a new client
 const $createClientLink = $('#create-client')
 const $createClientForm = $('#client-form')

 $createClientLink.on('click', () => {
     $workoutGenerator.hide()
     $workoutSection.hide()
     $home.hide()
     $createClientForm.show()
 })

 $createClientForm.on('submit', (e) => {
     e.preventDefault()
     $clientName = $('#client-name').val()
     let $clientAge = $('#client-age').val()
     let $clientBirthday = $('#client-birthday').val()

    db.collection('trainers').doc($userDisplayName).collection('clients').doc($clientName).set({
        name: $clientName,
        age: $clientAge,
        birthday: $clientBirthday
    })
     $createClientForm.trigger('reset')
     $createClientForm.hide()
     $workoutGenerator.show()
 })

 //listen for auth state changes
 const $workoutGenerator = $('#workout-generator')
 const $authLinks = $('.auth')
 const $noAuthLinks = $('.no-auth')

 auth.onAuthStateChanged(user => {
        if(user){
            $signupForm.hide()
            $workoutGenerator.show()
            $userDisplayName = user.displayName || $userDisplayName
            $authLinks.show()
            $noAuthLinks.hide()
            $clientsOptions.empty()
            let disabled = `<option value="" selected disabled>Select a Client</option>`
            $clientsOptions.append(disabled)
            $home.hide()
           
            console.log($userDisplayName)

            db.collection('trainers').doc($userDisplayName).collection('clients').onSnapshot(snapshot => {
                showData(snapshot.docs)
                getWorkouts(snapshot.docs)
            })
            
        } else {
            console.log('user logged out')
            $workoutGenerator.hide()
            $authLinks.hide()
            $noAuthLinks.show()
        }
 })



 //save workouts
let $client = $('#clients')

$('#save').on('click', () => {
    let exList = $('#exercise-list li')
    let toArray = jQuery.makeArray(exList)

    try{
        db.collection('trainers').doc($userDisplayName).collection('clients').doc($client.val()).collection('workouts').doc(`${new Date}`).set({
            workout: makeArrayOfExercises(toArray),
            date: new Date
        })
        
        $('#workout-generator').prepend(
            `<div class="alert alert-success" role="alert">
                Workout Successfully Saved!
            </div>`
      )

      $('.alert-danger').remove()

    } catch{
        $('#workout-generator').prepend(
            `<div class="alert alert-danger" role="alert">
                Something went wrong! Make sure to select a client!
            </div>`
      )
    }
    
})
 
 function makeArrayOfExercises(items){
    let newArr = []
    items.forEach(item => {
        newArr.push(item.innerText)
    })
    return newArr
 }

 const showData = (data) => {
    $clientsOptions.empty()
    let disabled = `<option value="" selected disabled>Select a Client</option>`
    $clientsOptions.append(disabled)
    data.forEach(doc => {
        let option = `<option value="${doc.data().name}">${doc.data().name}</option>`
        $clientsOptions.append(option)
    })
}

 // view workouts
 $viewWorkouts.on('click', () => {
    $signupForm.hide()
    $loginForm.hide()
    $workoutGenerator.hide()
    $createClientForm.hide()
    $workoutSection.hide()
    
})
const $workoutViewr = $('#client-workouts')

const getWorkouts = (data) => {
    $workoutViewr.empty()
    let disabled = `<option value="" selected disabled>Select a Client</option>`
    $workoutViewr.append(disabled)
    data.forEach(doc => {
        let option = `<option value="${doc.data().name}">${doc.data().name}</option>`
        $workoutViewr.append(option)
    })
    

}

const workoutViewForm = $('#ok')
workoutViewForm.on('submit', (e) => {
    e.preventDefault()
    console.log($workoutViewr.val())
    db.collection('trainers').doc($userDisplayName).collection('clients').doc(`${$workoutViewr.val()}`).collection('workouts').get().then( snapshot => {
        console.log(snapshot.docs.forEach(doc => {
            console.log(doc.data().workout)
        }))
    })
})