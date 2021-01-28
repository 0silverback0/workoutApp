const $clientListSection = $('.clients-list')
const $addClientForm = $('.add-client-form')
const $addClientsNav = $('.add-clients')
const $clientsNav = $('.clients')
// const $submitBtn = $('.submit')
let $clientName = $('#client-name')
let $clientAge = $('#client-age')
let $clientBirthday = $('#client-birthday')
let $goal = $('#Goal')
const $clientsUl = $('#clients-ul')
let $li = $('li')

$addClientForm.hide()


$clientsNav.on('click', () => {
    $addClientForm.hide()
    $clientListSection.show()
})

$addClientsNav.on('click', () => {
    $clientListSection.hide()
    $addClientForm.show()
})

$addClientForm.on('submit', (e) => {
    e.preventDefault()

    
    $li.text(`name: ${$clientName.val()} age: ${$clientAge.val()} birthday: ${$clientBirthday.val()} goal: ${$goal.val()}`)
    $clientsUl.append($li)

    $addClientForm.hide()
    $clientListSection.show()

})

