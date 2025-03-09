import './App.css'
window.addEventListener('DOMContentLoaded',function () {
    this.document.getElementById("Title").addEventListener("click", function() {
            window.location.reload();
    });
});
function Header(){
    return (
        <div id="header">
            <h1 id="Title"><a>Bird Directory</a></h1>
        </div>
    );
}

export default Header