$(function() {
	$("#comment-submit").click(function() {
		// if (!$('.comments').isVisible()) { return false; }
		if (!$("textarea[name='body']").val()) {endAlert("コメント内容が入力されていません"); return false; }
		$.ajax({
			type: "POST",
			url: "/blog/comment",
			data: {
				content: $("textarea[name='body']").val().replace(/\n/g, '<br>'),
				author: $("input[name='author']").val() || "名無しさん",
			},
		}).done((data) => {
			console.log(data);
			endAlert("投稿しました");
		}).fail((error) => {
			console.log(error);
			endAlert("エラーが発生しました");
		});
	});
	setTimeout(function() { $(".comment-create").show(); });

	function endAlert(text) {
		alert(text);
	}
});
