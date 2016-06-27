module.exports = {
  rules: [
    {
      pattern: /\/api\/getLivelist.php\?rtype=homeList$/,
      respondwith: './homeList.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=more$/,
      respondwith: './livelist-more.json'
    }
  ]
};
