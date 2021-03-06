module.exports = {
  "title": " sheepL",
  "description": "be what I want to be",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    // 博客配置
    "nav": [
      {
        "text": "首页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "联系",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/liyang1234567890",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "掘金",
        "desc": "here is juejin",
        "avatar": "https://cdn.segmentfault.com/v-5feb05cf/global/img/logo-b.svg",
        "link": "https://juejin.cn/user/3069492197065623/posts"
      },
      {
        "title": "segmentfault",
        "desc": "here is segmentfault",
        "avatar": "https://cdn.segmentfault.com/v-5feb05cf/global/img/logo-b.svg",
        "link": "https://segmentfault.com/u/liyang123"
      }
    ],
    "logo": "/sheep.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "yangyangli",
    "authorAvatar": "/avatar.jpg",
    "record": "洋洋李的博客",
    "startYear": "2021",
    "nextLinks": false,
    "prevLinks": false,
    "smoothScroll": true
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    ['@vuepress-reco/comments', {
      "solution": 'vssue',
      "options": {
        "title": 'vuepress-theme-reco',
        "platform": 'github',
        "owner": 'liyang1234567890',
        "repo": 'myBlog',
        "clientId": 'd43166926ff6cb6cd40c',
        "clientSecret": '448e851c71ff5c87f58ca8793f6208dae21c3aaf'
      }
    }]
  ],

}