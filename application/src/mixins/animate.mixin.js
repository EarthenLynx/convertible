import Velocity from "velocity-animate";

export default {
  methods: {
    hasNoHeight(el) {
      el.style.opacity = 0;
      el.style.height = "0em";
    },

    growsInHeight(el, done) {
      Velocity(
        el,
        {
          opacity: 1,
          height: "100%",
        },
        {
          duration: 2000,
          easing: [100, 5],
          complete: done,
        }
      );
    },

    shrinksInHeight(el, done) {
      Velocity(
        el,
        {
          opacity: 0,
          height: "0em",
          padding: 0,
          margin: 0,
          position: "absolute",
        },
        {
          duration: 500,
          easing: "ease-out",
          complete: done,
        }
      );
    },
  }
}