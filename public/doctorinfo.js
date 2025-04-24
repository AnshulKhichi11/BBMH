document.addEventListener("DOMContentLoaded", function () {
    const moreInfoBtn = document.getElementById("moreInfoBtn");

    if (moreInfoBtn) {
        moreInfoBtn.addEventListener("click", function () {
            window.location.href = "doctorinfoindex.html";
        });
    }
});


// gsap.from(".heading h2", {
//     // transform : "translateX(-100%)",
//     scale:0,
//     duration:0.1,
//     stagger:0.1,
//     repeat:-1
// })
// gsap.to(".heading h2", {
//     // // transform : "translateX(-100%)",
//     scale:0,
//     duration:1,
//     stagger:1,
//     yoyo:1,
// })

