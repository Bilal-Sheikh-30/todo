function showForm(){
    const formHandle = document.querySelector('.addTask');

    if (formHandle.style.display === 'none') {
        formHandle.style.display = 'block'
    }else{
        formHandle.style.display = 'none'
    }

}
let changes = false;

const completedTask = document.getElementsByClassName('task-complete');
for (let i = 0; i < completedTask.length; i++) {
    completedTask[i].addEventListener('click', () => {
        if (completedTask[i].style.textDecoration == 'line-through') {
            completedTask[i].style.textDecoration = 'none'
        }else{
        completedTask[i].style.textDecoration = 'line-through';
        changes = true;
        };
    })
}

const submitBtn = document.getElementById('btn-submit')

submitBtn.addEventListener('click', (e) => {
    if (!changes){
        e.preventDefault();
        alert('no changes to save.')
    }
})
