const Toast = /* @__PURE__ */ defineComponent({
  name: "Toast",
  props: props$5,
  setup(props2) {
    initI18nShowToastMsgsOnce();
    initI18nShowLoadingMsgsOnce();
    const { Icon } = useToastIcon(props2);
    const visible = usePopup(props2, {});
    return () => {
      const { mask, duration, title, image: image2 } = props2;
      return createVNode(
        Transition,
        {
          name: "uni-fade",
        },
        {
          default: () => [
            withDirectives(
              createVNode(
                "uni-toast",
                {
                  "data-duration": duration,
                },
                [
                  mask
                    ? createVNode(
                        "div",
                        {
                          class: "uni-mask",
                          style: "background: transparent;",
                          onTouchmove: onEventPrevent,
                        },
                        null,
                        40,
                        ["onTouchmove"]
                      )
                    : "",
                  !image2 && !Icon.value
                    ? createVNode(
                        "div",
                        {
                          class: "uni-sample-toast",
                        },
                        [
                          createVNode(
                            "p",
                            {
                              class: "uni-simple-toast__text",
                            },
                            [title]
                          ),
                        ]
                      )
                    : createVNode(
                        "div",
                        {
                          class: "uni-toast",
                        },
                        [
                          image2
                            ? createVNode(
                                "img",
                                {
                                  src: image2,
                                  class: ToastIconClassName,
                                },
                                null,
                                10,
                                ["src"]
                              )
                            : Icon.value,
                          createVNode(
                            "p",
                            {
                              class: "uni-toast__content",
                            },
                            [title]
                          ),
                        ]
                      ),
                ],
                8,
                ["data-duration"]
              ),
              [[vShow, visible.value]]
            ),
          ],
        }
      );
    };
  },
});
