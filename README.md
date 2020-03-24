
### Get Fake Refer for 1.1.1.1
[download sample apk](https://github.com/ssshojaei/warp-plus-fake-refer/blob/master/android/app/release/app-release.apk) | [telegram channel](https://t.me/ba_saleh)

#### Get Started

    git clone https://github.com/ssshojaei/warp-plus-fake-refer MyProject
    cd MyProject

with npm

    npm i
with yarn

    yarn
for react native < 0.61

    npx react-native link

#### rebuild android/ios folders

    rm -rf android ios
    yarn add react-native-eject
    npx react-native eject
#### release

	yarn global add react-native-rename generator-rn-toolbox
    react-native-rename 'Title' -b 'com.package.name'
    yo rn-toolbox:assets --icon /path/name/iconx512.png
    android-studio ./android
