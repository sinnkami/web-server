$(function() {
    const $menu = $("div.menu");
    $menu.children("ul.items").slicknav({
        duplicate: false,
        prependTo: $menu,
    });
    $menu.prependTo("div.headers");
    $("div.slicknav_menu").prepend($("div.headers div.header h1.title"));
});
