$(window).ready(function () {
	const ENTRY_ID_INPIT = "input[name='id']";
	const TITLE_INPUT = "input[name='title']";
	const CAEGORY_SELECT = "select[name='category']";
	const POST_BTN = "#post-button";
	const $summernote = $("#summernote").summernote({
		lang: "ja-JP",
	});

	$(POST_BTN).click(function () {
		const entryId = $(ENTRY_ID_INPIT).val();
		const title = $(TITLE_INPUT).val();
		const categoryId = $(CAEGORY_SELECT).val();
		const content = $summernote.summernote("code");
		// if ($(`${content}`).text().length) {
		// 	// TODO: コンソールではなく画面に表示
		// 	console.log("記事が書かれていない");
		// 	return false;
		// }

		$.ajax({
			type: "POST",
			url: "/system/blog/update",
			data: {
				entryId,
				title,
				categoryId,
				content,
				post: false,
			},
		}).then(function (value) {
			console.log(value);
		}).catch(function (err) {
			console.error(err);
		})
	});
});
