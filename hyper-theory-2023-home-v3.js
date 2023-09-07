<!-- Include Matter.js library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.18.0/matter.min.js" integrity="sha512-5T245ZTH0m0RfONiFm2NF0zcYcmAuNzcGyPSQ18j8Bs5Pbfhp5HP1hosrR8XRt5M3kSRqzjNMYpm2+it/AUX/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
  const matterContainer = document.querySelector("#matter-container");
  const THICCNESS = 60;
  const Engine = Matter.Engine, Render = Matter.Render, Runner = Matter.Runner, Bodies = Matter.Bodies, Composite = Matter.Composite, Body = Matter.Body;
  const engine = Engine.create();
  const render = Render.create({ element: matterContainer, engine, options: { width: matterContainer.clientWidth, height: matterContainer.clientHeight, background: "transparent", wireframes: false, showAngleIndicator: false } });
  const numBodies = 200;

  for (let i = 0; i < numBodies; i++) {
    let circle = Bodies.circle(Math.random() * matterContainer.clientWidth, Math.random() * matterContainer.clientHeight, 39, { friction: .1, frictionAir: 0.00001, restitution: 0.3, render: { sprite: { texture: 'https://uploads-ssl.webflow.com/64f024c208db7bbce63d76ba/64f12d4a6fa1f35dfc487566_ballpit-ball-logo-77px-2.png' } } });
    Composite.add(engine.world, circle);
  }

  const ground = Bodies.rectangle(matterContainer.clientWidth / 2, matterContainer.clientHeight + THICCNESS / 2, 27184, THICCNESS, { isStatic: true });
  const paddingLeft = 150, paddingTop = 150, paddingRight = 150, paddingBottom = 150;
  const outerContainer = Bodies.rectangle(matterContainer.clientWidth * 0.4 + (matterContainer.clientWidth * 0.9) / 2, ground.position.y - ground.height * 0.2, matterContainer.clientWidth * 0.9 + paddingLeft + paddingRight, matterContainer.clientHeight * 0.4 + paddingTop + paddingBottom, { isStatic: true, render: { fillStyle: "transparent", lineWidth: 0 } });
  const innerContent = Bodies.rectangle(outerContainer.position.x, outerContainer.position.y, matterContainer.clientWidth * 0.9, matterContainer.clientHeight * 0.4, { isStatic: true, render: { fillStyle: "#ffffff", sprite: { texture: null }, lineWidth: 0 } });
  const staticObject = Bodies.rectangle(matterContainer.clientWidth * 0.4 + (matterContainer.clientWidth * 0.9) / 2, ground.position.y - ground.height * 0.2, matterContainer.clientWidth * 0.9, matterContainer.clientHeight * 0.4, { isStatic: true, render: { fillStyle: "#ffffff", sprite: { texture: null }, lineWidth: 0 } });
  Composite.add(engine.world, staticObject);

  Composite.add(engine.world, [outerContainer, innerContent]);
  let leftWall = Bodies.rectangle(0 - THICCNESS / 2, matterContainer.clientHeight / 2, THICCNESS, matterContainer.clientHeight * 5, { isStatic: true });
  let rightWall = Bodies.rectangle(matterContainer.clientWidth + THICCNESS / 2, matterContainer.clientHeight / 2, THICCNESS, matterContainer.clientHeight * 5, { isStatic: true });
  Composite.add(engine.world, [ground, leftWall, rightWall]);
  let mouse = Matter.Mouse.create(render.canvas);
  let mouseConstraint = Matter.MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
  Composite.add(engine.world, mouseConstraint);
  mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
  mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  function handleResize(matterContainer) {
    render.canvas.width = matterContainer.clientWidth;
    render.canvas.height = matterContainer.clientHeight;
    Matter.Body.setPosition(ground, Matter.Vector.create(matterContainer.clientWidth / 2, matterContainer.clientHeight + THICCNESS / 2));
    Matter.Body.setPosition(rightWall, Matter.Vector.create(matterContainer.clientWidth + THICCNESS / 2, matterContainer.clientHeight / 2));
  }

  function handleResizeStaticObject() {
    Matter.Body.setPosition(staticObject, { x: matterContainer.clientWidth * 0.4 + (matterContainer.clientWidth * 0.9) / 2, y: ground.position.y - ground.height * 0.2 });
  }

  window.addEventListener("resize", () => {
    handleResize(matterContainer);
    handleResizeStaticObject();
  });

  handleResize(matterContainer);
  handleResizeStaticObject();

  function triggerExplosion() {
    for (let body of engine.world.bodies) {
      if (!body.isStatic) {
        const forceMagnitude = 0.5 * Math.random() + 0.5;
        const angle = Math.random() * 2 * Math.PI;
        const force = { x: forceMagnitude * Math.cos(angle), y: forceMagnitude * Math.sin(angle) };
        Body.applyForce(body, body.position, force);
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

  // Sticky Circle Grow
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

  // Define backgroundColorFrom, colorFrom, backgroundColorTo, and colorTo variables or provide appropriate values here.

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
$("[tr-scroll-toggle='component']").each(function (index) {
  // get elements
  let component = $(this);
  let lists = component.find("[tr-scroll-toggle='list']");
  // set item total
  let itemTotal = lists.first().children().length;
  component.find("[tr-scroll-toggle='number-total']").text(itemTotal);
  // create trigger divs & spacer
  let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
  for (let i = 1; i < itemTotal; i++) {
    firstTrigger.clone().appendTo(component);
  }
  let triggers = component.find("[tr-scroll-toggle='trigger']");
  firstTrigger.css("margin-top", "-100vh");
  let trSpacer = $("<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>").hide().appendTo(component);
  // check for min width
  let minWidth = 0;
  let trMinWidth = component.attr("tr-min-width");
  if (trMinWidth !== undefined && trMinWidth !== false) {
    minWidth = +trMinWidth;
  }
  // main breakpoint
  gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
    // show spacer
    trSpacer.show();
    // switch which item is active
    function makeItemActive(activeIndex) {
      component.find("[tr-scroll-toggle='transform-y']").css("transform", `translateY(${activeIndex * -100}%)`);
      component.find("[tr-scroll-toggle='transform-x']").css("transform", `translateX(${activeIndex * -100}%)`);
      component.find("[tr-scroll-toggle='number-current']").text(activeIndex + 1);
      lists.each(function (index) {
        $(this).children().removeClass("is-active");
        $(this).children().eq(activeIndex).addClass("is-active");
      });
    }
    makeItemActive(0);
    // scroll to trigger div on click of anchor
    let anchorLinks = component.find("[tr-anchors]").children();
    anchorLinks.on("click", function () {
      let myIndex = $(this).index();
      let scrollDistance = triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1;
      $("html, body").animate({ scrollTop: scrollDistance });
    });
    // triggers timeline
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
    // component timeline
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
    // optional scroll snapping
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
    // smaller screen sizes
    return () => {
      trSpacer.hide();
      component.find("[tr-scroll-toggle='transform-y']").css("transform", "translateY(0%)");
      component.find("[tr-scroll-toggle='transform-x']").css("transform", "translateX(0%)");
      lists.each(function (index) {
        $(this).children().removeClass("is-active");
      });
    };
  });
});
</script>
