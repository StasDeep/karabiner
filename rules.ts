import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    "description": "Cmd+Caps Lock to Caps Lock",
    "manipulators": [
      {
        "from": {
          "key_code": "caps_lock",
          "modifiers": {
            "mandatory": [
              "left_command"
            ],
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "caps_lock"
          }
        ],
        "type": "basic"
      }
    ]
  },
  {
    "manipulators": [
      {
        "description": "Change Caps Lock to Hyper Key, F18 when pressed alone.",
        "from": {
          "key_code": "caps_lock",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        "to_if_alone": [
          {
            "key_code": "f18"
          }
        ],
        "type": "basic"
      }
    ]
  },
  {
    "description": "Always treat the dictation media key as if it was just F5. Helps to totally disable the dictation popup for keyboards that don't handle the function keys correctly.",
    "manipulators": [
      {
        "from": {
          "consumer_key_code": "dictation",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "f5"
          }
        ],
        "type": "basic"
      }
    ]
  },
  ...createHyperSubLayers({
    c: app('Cursor'),
    // n = "N"otes
    n: app('Craft'),
    t: app("iTerm"),
    q: app("iTerm"),
    e: app("Telegram"),
    s: app("Slack"),
    a: app("Arc"),
    p: app("Adobe Photoshop 2024"),
    f: app("Finder"),
    g: app("ChatGPT"),
    l: app("Calendar"),
    // v = "V"irtual
    v: app('Gather'),
    // m = "M"usic
    m: app("Spotify"),
    // x = "X"HR
    x: app("Postman"),
    // b = "B"rowse
    b: {
      y: open("https://youtube.com"),
      m: open("https://maps.google.com"),
      e: open("https://mail.google.com"),
    },
    r: {
      e: open("raycast://extensions/bgnfu7re/craftdocs/search"),
      c: open("raycast://extensions/mooxl/coffee/caffeinate"),
      x: open("raycast://extensions/mooxl/coffee/decaffeinate"),
      s: open("raycast://extensions/raycast/snippets/search-snippets"),
      p: open("raycast://extensions/thomas/visual-studio-code/index"),
      w: open("raycast://script-commands/windows-setup"),
      d: open("raycast://extensions/raycast/system/toggle-system-appearance"),
    },
    // w = "Window"
    w: {
      equal_sign: open("-g raycast://extensions/raycast/window-management/make-larger"),
      hyphen: open("-g raycast://extensions/raycast/window-management/make-smaller"),
      l: open("-g raycast://extensions/raycast/window-management/almost-maximize"),
      m: open("-g raycast://extensions/raycast/window-management/maximize"),
      c: open("-g raycast://extensions/raycast/window-management/center"),
    },
    1: {
      to: [
        {
          "key_code": "1",
          "modifiers": ["left_shift","left_command","left_control","left_option"]
        }
      ]
    },
    2: {
      to: [
        {
          "key_code": "2",
          "modifiers": ["left_shift","left_command","left_control","left_option"]
        }
      ]
    },
    3: {
      to: [
        {
          "key_code": "3",
          "modifiers": ["left_shift","left_command","left_control","left_option"]
        }
      ]
    }
    // o = "Open" applications
    // o: {
    //   1: app("1Password"),
    //   g: app("Google Chrome"),
    //   c: app("Notion Calendar"),
    //   v: app("Visual Studio Code"),
    //   d: app("Discord"),
    //   s: app("Slack"),
    //   e: app("Superhuman"),
    //   n: app("Notion"),
    //   t: app("Warp"),
    //   // Open todo list managed via *H*ypersonic
    //   h: open(
    //     "notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026"
    //   ),
    //   z: app("zoom.us"),
    //   // "M"essages
    //   m: app("Texts"),
    //   f: app("Finder"),
    //   r: app("Texts"),
    //   // "i"Message
    //   i: app("Texts"),
    //   p: app("Spotify"),
    //   a: app("iA Presenter"),
    //   // "W"hatsApp has been replaced by Texts
    //   w: open("Texts"),
    //   l: open(
    //     "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
    //   ),
    // },

    // // w = "Window" via rectangle.app
    // w: {
    //   semicolon: {
    //     description: "Window: Hide",
    //     to: [
    //       {
    //         key_code: "h",
    //         modifiers: ["right_command"],
    //       },
    //     ],
    //   },
    //   y: rectangle("previous-display"),
    //   o: rectangle("next-display"),
    //   k: rectangle("top-half"),
    //   j: rectangle("bottom-half"),
    //   h: rectangle("left-half"),
    //   l: rectangle("right-half"),
    //   f: rectangle("maximize"),
    //   u: {
    //     description: "Window: Previous Tab",
    //     to: [
    //       {
    //         key_code: "tab",
    //         modifiers: ["right_control", "right_shift"],
    //       },
    //     ],
    //   },
    //   i: {
    //     description: "Window: Next Tab",
    //     to: [
    //       {
    //         key_code: "tab",
    //         modifiers: ["right_control"],
    //       },
    //     ],
    //   },
    //   n: {
    //     description: "Window: Next Window",
    //     to: [
    //       {
    //         key_code: "grave_accent_and_tilde",
    //         modifiers: ["right_command"],
    //       },
    //     ],
    //   },
    //   b: {
    //     description: "Window: Back",
    //     to: [
    //       {
    //         key_code: "open_bracket",
    //         modifiers: ["right_command"],
    //       },
    //     ],
    //   },
    //   // Note: No literal connection. Both f and n are already taken.
    //   m: {
    //     description: "Window: Forward",
    //     to: [
    //       {
    //         key_code: "close_bracket",
    //         modifiers: ["right_command"],
    //       },
    //     ],
    //   },
    //   d: {
    //     description: "Window: Next display",
    //     to: [
    //       {
    //         key_code: "right_arrow",
    //         modifiers: ["right_control", "right_option", "right_command"],
    //       },
    //     ],
    //   },
    // },

    // // s = "System"
    // s: {
    //   u: {
    //     to: [
    //       {
    //         key_code: "volume_increment",
    //       },
    //     ],
    //   },
    //   j: {
    //     to: [
    //       {
    //         key_code: "volume_decrement",
    //       },
    //     ],
    //   },
    //   i: {
    //     to: [
    //       {
    //         key_code: "display_brightness_increment",
    //       },
    //     ],
    //   },
    //   k: {
    //     to: [
    //       {
    //         key_code: "display_brightness_decrement",
    //       },
    //     ],
    //   },
    //   l: {
    //     to: [
    //       {
    //         key_code: "q",
    //         modifiers: ["right_control", "right_command"],
    //       },
    //     ],
    //   },
    //   p: {
    //     to: [
    //       {
    //         key_code: "play_or_pause",
    //       },
    //     ],
    //   },
    //   semicolon: {
    //     to: [
    //       {
    //         key_code: "fastforward",
    //       },
    //     ],
    //   },
    //   e: {
    //     to: [
    //       {
    //         // Emoji picker
    //         key_code: "spacebar",
    //         modifiers: ["right_control", "right_command"],
    //       },
    //     ],
    //   },
    //   // Turn on Elgato KeyLight
    //   y: {
    //     to: [
    //       {
    //         shell_command: `curl -H 'Content-Type: application/json' --request PUT --data '{ "numberOfLights": 1, "lights": [ { "on": 1, "brightness": 100, "temperature": 215 } ] }' http://192.168.8.84:9123/elgato/lights`,
    //       },
    //     ],
    //   },
    //   h: {
    //     to: [
    //       {
    //         shell_command: `curl -H 'Content-Type: application/json' --request PUT --data '{ "numberOfLights": 1, "lights": [ { "on": 0, "brightness": 100, "temperature": 215 } ] }' http://192.168.8.84:9123/elgato/lights`,
    //       },
    //     ],
    //   },
    //   // "D"o not disturb toggle
    //   d: open(`raycast://extensions/yakitrak/do-not-disturb/toggle`),
    // },

    // // v = "moVe" which isn't "m" because we want it to be on the left hand
    // // so that hjkl work like they do in vim
    // v: {
    //   h: {
    //     to: [{ key_code: "left_arrow" }],
    //   },
    //   j: {
    //     to: [{ key_code: "down_arrow" }],
    //   },
    //   k: {
    //     to: [{ key_code: "up_arrow" }],
    //   },
    //   l: {
    //     to: [{ key_code: "right_arrow" }],
    //   },
    //   // Magicmove via homerow.app
    //   m: {
    //     to: [{ key_code: "f", modifiers: ["right_control"] }],
    //   },
    //   // Scroll mode via homerow.app
    //   s: {
    //     to: [{ key_code: "j", modifiers: ["right_control"] }],
    //   },
    //   d: {
    //     to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
    //   },
    //   u: {
    //     to: [{ key_code: "page_down" }],
    //   },
    //   i: {
    //     to: [{ key_code: "page_up" }],
    //   },
    // },

    // // c = Musi*c* which isn't "m" because we want it to be on the left hand
    // c: {
    //   p: {
    //     to: [{ key_code: "play_or_pause" }],
    //   },
    //   n: {
    //     to: [{ key_code: "fastforward" }],
    //   },
    //   b: {
    //     to: [{ key_code: "rewind" }],
    //   },
    // },

    // // r = "Raycast"
    // r: {
    //   n: open("raycast://script-commands/dismiss-notifications"),
    //   l: open(
    //     "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
    //   ),
    //   e: open(
    //     "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
    //   ),
    //   c: open("raycast://extensions/raycast/system/open-camera"),
    //   p: open("raycast://extensions/raycast/raycast/confetti"),
    //   a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
    //   s: open("raycast://extensions/peduarte/silent-mention/index"),
    //   h: open(
    //     "raycast://extensions/raycast/clipboard-history/clipboard-history"
    //   ),
    //   1: open(
    //     "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
    //   ),
    //   2: open(
    //     "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
    //   ),
    // },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      "global": {
        "ask_for_confirmation_before_quitting": true,
        "check_for_updates_on_startup": true,
        "show_in_menu_bar": false,
        "show_profile_name_in_menu_bar": false,
        "unsafe_ui": false
      },
      "profiles": [
        {
          "complex_modifications": {
            "parameters": {
              "basic.simultaneous_threshold_milliseconds": 50,
              "basic.to_delayed_action_delay_milliseconds": 500,
              "basic.to_if_alone_timeout_milliseconds": 1000,
              "basic.to_if_held_down_threshold_milliseconds": 500,
              "mouse_motion_to_scroll.speed": 100
            },
            "rules": rules
          },
          "devices": [
            {
              "disable_built_in_keyboard_if_exists": false,
              "fn_function_keys": [],
              "game_pad_swap_sticks": false,
              "identifiers": {
                "is_game_pad": false,
                "is_keyboard": true,
                "is_pointing_device": false,
                "product_id": 0,
                "vendor_id": 0
              },
              "ignore": false,
              "manipulate_caps_lock_led": true,
              "mouse_flip_horizontal_wheel": false,
              "mouse_flip_vertical_wheel": false,
              "mouse_flip_x": false,
              "mouse_flip_y": false,
              "mouse_swap_wheels": false,
              "mouse_swap_xy": false,
              "simple_modifications": [],
              "treat_as_built_in_keyboard": false
            },
            {
              "disable_built_in_keyboard_if_exists": false,
              "fn_function_keys": [],
              "game_pad_swap_sticks": false,
              "identifiers": {
                "is_game_pad": false,
                "is_keyboard": false,
                "is_pointing_device": true,
                "product_id": 0,
                "vendor_id": 0
              },
              "ignore": true,
              "manipulate_caps_lock_led": false,
              "mouse_flip_horizontal_wheel": false,
              "mouse_flip_vertical_wheel": false,
              "mouse_flip_x": false,
              "mouse_flip_y": false,
              "mouse_swap_wheels": false,
              "mouse_swap_xy": false,
              "simple_modifications": [],
              "treat_as_built_in_keyboard": false
            },
            {
              "disable_built_in_keyboard_if_exists": false,
              "fn_function_keys": [],
              "game_pad_swap_sticks": false,
              "identifiers": {
                "is_game_pad": false,
                "is_keyboard": true,
                "is_pointing_device": false,
                "product_id": 591,
                "vendor_id": 1452
              },
              "ignore": false,
              "manipulate_caps_lock_led": true,
              "mouse_flip_horizontal_wheel": false,
              "mouse_flip_vertical_wheel": false,
              "mouse_flip_x": false,
              "mouse_flip_y": false,
              "mouse_swap_wheels": false,
              "mouse_swap_xy": false,
              "simple_modifications": [],
              "treat_as_built_in_keyboard": false
            },
            {
              "disable_built_in_keyboard_if_exists": false,
              "fn_function_keys": [],
              "game_pad_swap_sticks": false,
              "identifiers": {
                "is_game_pad": false,
                "is_keyboard": true,
                "is_pointing_device": false,
                "product_id": 50504,
                "vendor_id": 1133
              },
              "ignore": false,
              "manipulate_caps_lock_led": true,
              "mouse_flip_horizontal_wheel": false,
              "mouse_flip_vertical_wheel": false,
              "mouse_flip_x": false,
              "mouse_flip_y": false,
              "mouse_swap_wheels": false,
              "mouse_swap_xy": false,
              "simple_modifications": [],
              "treat_as_built_in_keyboard": false
            },
            {
              "disable_built_in_keyboard_if_exists": false,
              "fn_function_keys": [],
              "game_pad_swap_sticks": false,
              "identifiers": {
                "is_game_pad": false,
                "is_keyboard": false,
                "is_pointing_device": true,
                "product_id": 50504,
                "vendor_id": 1133
              },
              "ignore": true,
              "manipulate_caps_lock_led": false,
              "mouse_flip_horizontal_wheel": false,
              "mouse_flip_vertical_wheel": false,
              "mouse_flip_x": false,
              "mouse_flip_y": false,
              "mouse_swap_wheels": false,
              "mouse_swap_xy": false,
              "simple_modifications": [],
              "treat_as_built_in_keyboard": false
            }
          ],
          "fn_function_keys": [
            {
              "from": {
                "key_code": "f1"
              },
              "to": [
                {
                  "consumer_key_code": "display_brightness_decrement"
                }
              ]
            },
            {
              "from": {
                "key_code": "f2"
              },
              "to": [
                {
                  "consumer_key_code": "display_brightness_increment"
                }
              ]
            },
            {
              "from": {
                "key_code": "f3"
              },
              "to": [
                {
                  "apple_vendor_keyboard_key_code": "mission_control"
                }
              ]
            },
            {
              "from": {
                "key_code": "f4"
              },
              "to": [
                {
                  "apple_vendor_keyboard_key_code": "launchpad"
                }
              ]
            },
            {
              "from": {
                "key_code": "f5"
              },
              "to": [
                {
                  "key_code": "f5"
                }
              ]
            },
            {
              "from": {
                "key_code": "f6"
              },
              "to": [
                {
                  "key_code": "f6"
                }
              ]
            },
            {
              "from": {
                "key_code": "f7"
              },
              "to": [
                {
                  "consumer_key_code": "rewind"
                }
              ]
            },
            {
              "from": {
                "key_code": "f8"
              },
              "to": [
                {
                  "consumer_key_code": "play_or_pause"
                }
              ]
            },
            {
              "from": {
                "key_code": "f9"
              },
              "to": [
                {
                  "consumer_key_code": "fast_forward"
                }
              ]
            },
            {
              "from": {
                "key_code": "f10"
              },
              "to": [
                {
                  "consumer_key_code": "mute"
                }
              ]
            },
            {
              "from": {
                "key_code": "f11"
              },
              "to": [
                {
                  "consumer_key_code": "volume_decrement"
                }
              ]
            },
            {
              "from": {
                "key_code": "f12"
              },
              "to": [
                {
                  "consumer_key_code": "volume_increment"
                }
              ]
            }
          ],
          "name": "Default profile",
          "parameters": {
            "delay_milliseconds_before_open_device": 1000
          },
          "selected": true,
          "simple_modifications": [
            {
              "from": {
                "key_code": "insert"
              },
              "to": [
                {
                  "key_code": "f19"
                }
              ]
            },
            {
              "from": {
                "key_code": "non_us_backslash"
              },
              "to": [
                {
                  "key_code": "grave_accent_and_tilde"
                }
              ]
            }
          ],
          "virtual_hid_keyboard": {
            "country_code": 0,
            "indicate_sticky_modifier_keys_state": true,
            "mouse_key_xy_scale": 100
          }
        }
      ]
    },
    null,
    2
  )
);
