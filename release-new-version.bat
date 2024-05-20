git push
git pull
git checkout master

echo off
echo Increase version number in the file 'package.json'
pause
echo Confirm version number has been updated
pause
for /f "delims=" %%i in ('
  node -e "console.log(require('./client/package.json').version)"
') do set version=%%i

git commit -a -m "Set v%version%"
git tag v%version%
git push
git push origin v%version%
