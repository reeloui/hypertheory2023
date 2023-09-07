<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.18.0/matter.min.js" integrity="sha512-5T245ZTH0m0RfONiFm2NF0zcYcmAuNzcGyPSQ18j8Bs5Pbfhp5HP1hosrR8XRt5M3kSRqzjNMYpm2+it/AUX/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
  const C = document.querySelector("#matter-container");
  const E = Matter.Engine, R = Matter.Render, N = Matter.Runner, B = Matter.Bodies, Cm = Matter.Composite, Bdy = Matter.Body;
  const engine = E.create();
  const render = R.create({ element: C, engine, options: { width: C.clientWidth, height: C.clientHeight, background: "transparent", wireframes: false, showAngleIndicator: false } });
  const numBodies = 200;

  for (let i = 0; i < numBodies; i++) {
    let circle = B.circle(Math.random() * C.clientWidth, Math.random() * C.clientHeight, 39, { friction: .1, frictionAir: 0.00001, restitution: 0.3, render: { sprite: { texture: 'https://uploads-ssl.webflow.com/64f024c208db7bbce63d76ba/64f90fa2015b8188d102df39_ballpit-ball-pink-77px.png' } } });
    let circle2 = B.circle(Math.random() * C.clientWidth, Math.random() * C.clientHeight, 39, { friction: .1, frictionAir: 0.00001, restitution: 0.3, render: { sprite: { texture: 'https://uploads-ssl.webflow.com/64f024c208db7bbce63d76ba/64f90fa26b0566382035e3eb_ballpit-ball-blue-77px.png' } } });
    let circle3 = B.circle(Math.random() * C.clientWidth, Math.random() * C.clientHeight, 39, { friction: .1, frictionAir: 0.00001, restitution: 0.3, render: { sprite: { texture: 'https://uploads-ssl.webflow.com/64f024c208db7bbce63d76ba/64f90fa21881c505867d1ccd_ballpit-ball-pink-47px.png' } } });
    let circle4 = B.circle(Math.random() * C.clientWidth, Math.random() * C.clientHeight, 39, { friction: .1, frictionAir: 0.00001, restitution: 0.3, render: { sprite: { texture: 'https://uploads-ssl.webflow.com/64f024c208db7bbce63d76ba/64f90fa2c5e1bf40aaa03bde_ballpit-ball-blue-47px.png' } } });
    Cm.add(engine.world, circle, circle2, circle3, circle4);
  }

  const ground = B.rectangle(C.clientWidth / 2, C.clientHeight + 60 / 2, 27184, 60, { isStatic: true });
  const outerContainer = B.rectangle(C.clientWidth * 0.4 + (C.clientWidth * 0.9) / 2, ground.position.y - ground.height * 0.2, C.clientWidth * 0.9 + 150 + 150, C.clientHeight * 0.4 + 150 + 150, { isStatic: true, render: { fillStyle: "transparent", lineWidth: 0 } });
  const innerContent = B.rectangle(outerContainer.position.x, outerContainer.position.y, C.clientWidth * 0.9, C.clientHeight * 0.4, { isStatic: true, render: { fillStyle: "#ffffff", sprite: { texture: null }, lineWidth: 0 } });
  const staticObject = B.rectangle(C.clientWidth * 0.4 + (C.clientWidth * 0.9) / 2, ground.position.y - ground.height * 0.2, C.clientWidth * 0.9, C.clientHeight * 0.4, { isStatic: true, render: { fillStyle: "#ffffff", sprite: { texture: null }, lineWidth: 0 } });
  Cm.add(engine.world, staticObject);

  Cm.add(engine.world, [outerContainer, innerContent]);
  let leftWall = B.rectangle(0 - 60 / 2, C.clientHeight / 2, 60, C.clientHeight * 5, { isStatic: true });
  let rightWall = B.rectangle(C.clientWidth + 60 / 2, C.clientHeight / 2, 60, C.clientHeight * 5, { isStatic: true });
  Cm.add(engine.world, [ground, leftWall, rightWall]);
  let mouse = Matter.Mouse.create(render.canvas);
  let mouseConstraint = Matter.MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
  Cm.add(engine.world, mouseConstraint);
  mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
  mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
  R.run(render);
  const runner = N.create();
  N.run(runner, engine);

  function handleResize(C) {
    render.canvas.width = C.clientWidth;
    render.canvas.height = C.clientHeight;
    Bdy.setPosition(ground, Matter.Vector.create(C.clientWidth / 2, C.clientHeight + 60 / 2));
    Bdy.setPosition(rightWall, Matter.Vector.create(C.clientWidth + 60 / 2, C.clientHeight / 2));
  }

  function handleResizeStaticObject() {
    Bdy.setPosition(staticObject, { x: C.clientWidth * 0.4 + (C.clientWidth * 0.9) / 2, y: ground.position.y - ground.height * 0.2 });
  }

  window.addEventListener("resize", () => {
    handleResize(C);
    handleResizeStaticObject();
  });

  handleResize(C);

  function triggerExplosion() {
    for (let body of engine.world.bodies) {
      if (!body.isStatic) {
        const forceMagnitude = 0.5 * Math.random() + 0.5;
        const angle = Math.random() * 2 * Math.PI;
        const force = { x: forceMagnitude * Math.cos(angle), y: forceMagnitude * Math.sin(angle) };
        Bdy.applyForce(body, body.position, force);
      }
    }
  }

  const explosionButton = document.getElementById("ht-btn");
  explosionButton.addEventListener("click", () => { triggerExplosion(); });
</script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({ markers: false });

  function createTimeline(triggerElement, targetElement, start, end, scrub, from, to, duration) {
    return gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: start,
        end: end,
        scrub: scrub,
      },
    }).fromTo(targetElement, from, to, duration);
  }

  $(".sticky-circle_wrap").each(function () {
    createTimeline(
      $(this),
      $(".sticky-circle_element"),
      "top top",
      "bottom bottom",
      1,
      { width: "35em", height: "35em", borderRadius: "35em" },
      { width: "100vw", height: "100vh", borderRadius: "0em" },
      1
    );
  });

  createTimeline(
    $(this),
    $("body, .section.is--nav"),
    "top top",
    "bottom bottom",
    1,
    { backgroundColor: backgroundColorFrom, color: colorFrom },
    { backgroundColor: backgroundColorTo, color: colorTo },
    1
  );
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"></script>
<script>
$("[tr-scroll-toggle='component']").each(function () {
  let component = $(this);
  let lists = component.find("[tr-scroll-toggle='list']");
  let itemTotal = lists.first().children().length;
  component.find("[tr-scroll-toggle='number-total']").text(itemTotal);
  let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
  for (let i = 1; i < itemTotal; i++) {
    firstTrigger.clone().appendTo(component);
  }
  let triggers = component.find("[tr-scroll-toggle='trigger']");
  firstTrigger.css("margin-top", "-100vh");
  let trSpacer = $("<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>").hide().appendTo(component);
  let minWidth = 0;
  let trMinWidth = component.attr("tr-min-width");
  if (trMinWidth !== undefined && trMinWidth !== false) {
    minWidth = +trMinWidth;
  }
  gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
    trSpacer.show();
    function makeItemActive(activeIndex) {
      component.find("[tr-scroll-toggle='transform-y']").css("transform", `translateY(${activeIndex * -100}%)`);
      component.find("[tr-scroll-toggle='transform-x']").css("transform", `translateX(${activeIndex * -100}%)`);
      component.find("[tr-scroll-toggle='number-current']").text(activeIndex + 1);
      lists.each(function () {
        $(this).children().removeClass("is-active");
        $(this).children().eq(activeIndex).addClass("is-active");
      });
    }
    makeItemActive(0);
    let anchorLinks = component.find("[tr-anchors]").children();
    anchorLinks.on("click", function () {
      let myIndex = $(this).index();
      let scrollDistance = triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1;
      $("html, body").animate({ scrollTop: scrollDistance });
    });
    triggers.each(function (index) {
      let triggerIndex = index;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top top",
          end: "bottom top",
          scrub: true,
          onToggle: ({ self, isActive }) => {
            if (isActive) {
              makeItemActive(triggerIndex);
            }
          }
        },
        defaults: {
          ease: "none"
        }
      });
      lists.each(function () {
        let childItem = $(this).children().eq(triggerIndex);
        tl.to(childItem.find("[tr-item-animation='scale-to-1']"), { scale: 1 }, 0);
        tl.from(childItem.find("[tr-item-animation='scale-from-1']"), { scale: 1 }, 0);
        tl.to(childItem.find("[tr-item-animation='progress-horizontal']"), { width: "100%" }, 0);
        tl.to(childItem.find("[tr-item-animation='progress-vertical']"), { height: "100%" }, 0);
        tl.to(childItem.find("[tr-item-animation='rotate-to-0']"), { rotation: 0 }, 0);
        tl.from(childItem.find("[tr-item-animation='rotate-from-0']"), { rotation: 0 }, 0);
      });
    });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: component,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      },
      defaults: {
        ease: "none"
      }
    });
    tl.to(component.find("[tr-section-animation='scale-to-1']"), { scale: 1 }, 0);
    tl.from(component.find("[tr-section-animation='scale-from-1']"), { scale: 1 }, 0);
    tl.to(component.find("[tr-section-animation='progress-horizontal']"), { width: "100%" }, 0);
    tl.to(component.find("[tr-section-animation='progress-vertical']"), { height: "100%" }, 0);
    tl.to(component.find("[tr-section-animation='rotate-to-0']"), { rotation: 0 }, 0);
    tl.from(component.find("[tr-section-animation='rotate-from-0']"), { rotation: 0 }, 0);
    if (component.attr("tr-scroll-snap") === "true") {
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "top top",
          end: "bottom bottom",
          snap: {
            snapTo: "labelsDirectional",
            duration: { min: 0.01, max: 0.2 },
            delay: 0.0001,
            ease: "power1.out"
          }
        }
      });
      triggers.each(function (index) {
        tl2.to($(this), { scale: 1, duration: 1 });
        tl2.addLabel("trigger" + index);
      });
    }
    return () => {
      trSpacer.hide();
      component.find("[tr-scroll-toggle='transform-y']").css("transform", "translateY(0%)");
      component.find("[tr-scroll-toggle='transform-x']").css("transform", "translateX(0%)");
      lists.each(function () {
        $(this).children().removeClass("is-active");
      });
    };
  });
});
</script>
