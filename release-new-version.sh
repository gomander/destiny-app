git push
git pull
git checkout main

pnpm version -r major
version=$(node -e "console.log(require('./package.json').version.split('.')[0])")

git commit -a -m "Set v%version%"
git tag v%version%
git push
git push origin v%version%
