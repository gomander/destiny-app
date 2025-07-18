git push
git pull
git checkout master

cd client
call pnpm version major
cd ..
for /f "delims=" %%i in ('
  node -e "console.log(require('./client/package.json').version.split('.')[0])"
') do set version=%%i

git commit -a -m "Set v%version%"
git tag v%version%
git push
git push origin v%version%
