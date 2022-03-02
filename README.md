## What's?

正規表現でマッチした箇所を削除するツール

左側（もしくは上側）にテキストを入力すると、正規表現にマッチした部分が削除されて、右側（もしくは下側）に結果が出力される。

使用する正規表現は編集可能であり、上部の`設定`ボタンから編集できる。

## 諸注意

VSCodeにて`Dev Container`上で開発するための`.devcontainer`はgitに含んでいない。プロジェクトルートを`.devcontainer`と兄弟になるようなディレクトリ配置をするといい。

```bash
.
├── .devcontainer
└── comment-remover  # this project root
```

`code .`でオープンするといい。
