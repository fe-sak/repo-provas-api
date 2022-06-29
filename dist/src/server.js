import app from './app.js';
app.listen(+process.env.PORT || 5000, function () {
    console.log("Listening on ".concat(process.env.PORT, "..."));
});
