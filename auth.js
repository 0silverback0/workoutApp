let $signupForm = $('#signup-form')
let $userDisplayName
const $clientsOptions = $('#clients')
const $home = $('#home')

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
        $signupForm.hide()
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
     $createClientForm.show()
 })

 $createClientForm.on('submit', (e) => {
     e.preventDefault()
     let $clientName = $('#client-name').val()
     let $clientAge = $('#client-age').val()
     let $clientBirthday = $('#client-birthday').val()
// ???? this should create user display name at trainer sign up as well
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
            $workoutGenerator.show()
            $userDisplayName = user.displayName || $userDisplayName
            $authLinks.show()
            $noAuthLinks.hide()
            $clientsOptions.empty()
            let disabled = `<option value="" selected disabled>Select a Client</option>`
            $clientsOptions.append(disabled)
            $home.hide()
            //database test
            // db.collection('trainers').doc($userDisplayName).collection('clients').get().then(snapshot => {
            //     showData(snapshot.docs)
            // })
            console.log($userDisplayName)
            db.collection('trainers').doc($userDisplayName).collection('clients').onSnapshot(snapshot => {
                showData(snapshot.docs)
            })
            
            
            const showData = (data) => {
                $clientsOptions.empty()
                let disabled = `<option value="" selected disabled>Select a Client</option>`
                $clientsOptions.append(disabled)
                data.forEach(doc => {
                    let option = `<option value="${doc.data().name}">${doc.data().name}</option>`
                    $clientsOptions.append(option)
                })
            }
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

    db.collection('trainers').doc($userDisplayName).collection('clients').doc($client.val()).collection('workouts').doc(`${new Date}`).set({
        workout: makeArrayOfExercises(toArray),
        date: new Date
    })
})
 
 function makeArrayOfExercises(items){
    let newArr = []
    items.forEach(item => {
        newArr.push(item.innerText)
    })
    return newArr
 }

 
