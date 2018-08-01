$(function() {
	function iphone() {
		var u = navigator.userAgent;
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
			$(".lafite_phone").attr("href","function://callapp?f=test&title=哇！我又拆了一个18元红包！&description=看资讯，拆红包，1元可提现，快来下载领取！>>&image=http://chuantu.biz/t6/351/1533084238x-1566688359.png&link=http://url.cn/5UTcSl0&callback=shareDone");
		} else if (u.indexOf('iPhone') > -1) {//苹果手机
			$(".lafite_phone").attr("href","function://callapp?f=showShareView&title=哇！我又拆了一个18元红包！&description=看资讯，拆红包，1元可提现，快来下载领取！>>&image=http://chuantu.biz/t6/351/1533084238x-1566688359.png&link=http://url.cn/5UTcSl0&callback=shareDone");
		} else if (u.indexOf('Windows Phone') > -1) {//winphone手机
		// alert("winphone手机");
		// window.location.href = "mobile/index.html";
		}
	}
	iphone();
	function init() {
		var H = $(window).height(),
			W = $(window).width();
		$(".cover").css({"width": W, "height": H});
		$(".go_rank,.rank,.xuan_rank").click(function() {
			$(".home_page").hide();
			$(".rank_page").fadeIn(500);
		});
		$(".footer_left").click(function() {
			$(".cover,.zhuanpan").fadeIn(100);

		});
		$(".cover,.turn_close").click(function() {
			$(".cover").fadeOut(300);
			$(".zhuanpan").hide();
			$('.cover_fuck,.cover_quit').hide();
			$(".turntable-bg").fadeIn(300);
		});
		$(".xuan_home").click(function() {
			$(".rank_page,.tudi_all,.rules_page").hide();
			$(".home_page").fadeIn(300);
		});
		// $(".xuan_rules a").click(function () {
		//     $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top -0+ "rem"}, 500);
		//     return false;
		// });
		$(".xuan_rules").click(function () {
		    $(".home_page").hide();
		    $(".rules_page").fadeIn(300);
		});
		$(".tudi,.xuan_tudi,.new_tudi").click(function() {
			$(".home_page").hide();
			$(".tudi_all").fadeIn(400);
		});
		$(".cover_quit").click(function() {
			$(".cover_quit,.cover_fuck").hide();
			$(".turntable-bg").fadeIn(300);
		});
	}
	var page = 1;
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
	var uid = getQueryString('uid');
	var token = getQueryString('token');
	// var uid = "164ea98beee1112";
	// var token = "e7d1a5a6-a36a-4e59-906a-a48acfc1b5a0";
	// var hostname = "http://callback.ytoutiao.net";
	var hostname = "http://182.92.82.188:8084";
	function Ajaxfn() {
		var Url1 = hostname+"/yfax-htt-api/api/htt/queryHolidayActivityRanking";
		var Url2 = hostname+"/yfax-htt-api/api/htt/queryHolidayActivityInviteUser";
		var Url4 = hostname+"/yfax-htt-api/api/htt/queryHolidayActivityStudentList";
		var Url5 = hostname+"/yfax-htt-api/api/htt/doHolidayActivityAward";
		$.get(Url1,{"phoneNum": uid,"access_token": token},function(res){
			console.log(res);
			var now_rank = res.data.userRanking,
				up_rank = res.data.newRealUserGap;
		    // 前三名数据渲染
		    // console.log(now_rank);
		    if(now_rank == -1) {
				$(".rank_page_now").text("您未上榜！");
			}
			else if(now_rank > 999 ) {
				$(".rank_page_now span").text("999+");
			}

		    $(".rank_page_now span").text(now_rank);
		    $(".rank_page_now font").text(up_rank);
		    
		    // 702active新增 如何rankingList 为空，则不执行以下代码，防止代码报错。
		    if(res.data.rankingList.length !== 0) {
		    	for(var i = 0; i < 3; i++) {
		    	var name = res.data.rankingList[i].phoneNum,
		    		tudi = res.data.rankingList[i].realNewUsers,
		    		pic = res.data.rankingList[i].wechatHeadImgurl || "images/default_quesiton_icon.png";
		    		console.log(name);
		    	// 首页排行榜
		    	$(".rank_list"+(i+1)+" .rank_num").text(tudi);
		    	$(".rank_list"+(i+1)+" .rank_gift").text(name);
		    	$(".rank_list"+(i+1)+" .rank_pic img").attr("src",pic);

		    	// 邀请总榜前三名排行榜
		    	$(".rank_page_lists"+(i+1)+" .r_c_font_num").text(tudi);
		    	$(".rank_page_lists"+(i+1)+" .r_c_font_name").text(name);
		    	$(".rank_page_lists"+(i+1)+" .r_c_font_header").attr("src",pic);

		    	$(".r_page_web_name").eq(i).text(name);
		    	$(".r_duti_num").eq(i).text(tudi);	
			    }
			    // 排行榜渲染
			    for(var j = 3; j < 30; j++) {
			    	var name = res.data.rankingList[j].phoneNum,
			    		tudi = res.data.rankingList[j].realNewUsers;
			    	$(".r_false").before("<tr><td>"+(j+1)+"</td><td>"+name+"</td><td>"+tudi+"</td></tr>");
			    }
		    }else {
		    	console.error("rankingList数组没有值！")
		    }
		    
		});

		// 724活动新增
		$.get(Url2,{"phoneNum": uid,"access_token": token}, function(res){
			var inviteUserCount = res.data.inviteUserCount,
				realUserCount = res.data.realUserCount,
				deductUserCount = res.data.deductUserCount,
				allIncome = res.data.allIncome;
			console.log(res.data);
			$(".new_title_left .new_t_l_font span").text(inviteUserCount);
			$(".new_title_right .new_t_l_font span").text(realUserCount);
			$(".new_title_middle .new_t_l_font span").text(deductUserCount);
			$(".new_t_t_middle span").text(allIncome);

			function newjiuFn() {
				var nowStep = res.data.dataList.length;
				for(var j = 0; j < nowStep; j++) {
					if(res.data.dataList[j].isDelete == 1) {
						$(".award_red_pic").eq(j).attr("src","images/default_redbag_reward.png");
						$(".award_red_pointer").eq(j).hide();
						$(".award_red_qian").eq(j).show().find("span").text(res.data.dataList[j].curStep);
					}
				}
				for(var i = nowStep,Len = $(".award_red").length;i < Len;i++) {
					$(".award_red").eq(i).css({"opacity":".5","pointer-events":"none"});
				}
				$(".award_red_pointer").click(function() {
					var Index = $(this).parent().index()-1;
					// console.log($(this).parent().index());
					var Id = res.data.dataList[Index].id;
					$.post(Url5,{"id": Id,"access_token": token,"phoneNum": uid}, function(res){
						console.log(Index);
						$(".alert_money_font span").text(res.data);
						setTimeout(function() {
							$(".award_red_pic").eq(Index).attr("src","images/default_redbag_reward.png");
							$(".award_red_pointer").eq(Index).hide();
							$(".award_red_qian").eq(Index).show().find("span").text(res.data);
						},2000)
					});
					$(".alert_money").show();
					setTimeout(function() {
						$(".alert_money").hide();
					},2000);
				})
			}
			newjiuFn();
		});

		// 九宫格 
		// $.get(Url2,{"phoneNum": uid,"access_token": token}, function(res){
		// 	// var Img = res.data.headImgUr || "images/default_list_header_icon.png";
		// 	// $(".a_mian_pic img").attr("src",Img);
		// 	console.log(res);
		// 	$(".cover_num span").text(res.data.remainLotteryTimes);
		// 	if(res.data.remainLotteryTimes <= 0) {
		// 	}
		// 	var invite_tudi = res.data.inviteUserCount,
		// 		use_tudi = res.data.realUserCount,
		// 		income = res.data.allIncome,
		// 		indexs,
		// 		curStep = parseFloat(res.data.curStep);
		// 		// curStep = 15;
		// 	$(".new_title_left .new_t_l_font span").text(invite_tudi);
		// 	$(".new_title_right .new_t_l_font span").text(use_tudi);
		// 	$(".new_t_t_middle span").text(income);
		// 	$(".a_mian_oder").text(use_tudi);
		// 	console.log(curStep);
		// 	for(var i = 0; i < 13; i++) {
		// 		if($(".lafite_list"+(i+1)+" .aw_con_list_font div span").text() == curStep) {
		// 			indexs = i;
		// 		}
		// 	}
		// 	var all_num = $(".lafite_list"+(indexs+2)+" .aw_tudi font").text() || 2;
		// 	$(".a_mian_oder2").text(all_num);
		// 	$(".aw_title_font span").text($(".lafite_list"+(indexs+1)+" .aw_con_list_font div span").text() || 0);

		// 	// 进度条长度
		// 	var Wid = (use_tudi/all_num)*100;
		// 	if((Wid/100) > 1) {
		// 		$(".a_mian_fill").css("width","100%");
		// 	}else {
		// 		$(".a_mian_fill").css("width",Wid+"%");
		// 	}

		// 	// 九宫格默认样式
		// 	if($(".aw_tudi font").eq(indexs+1).text() == 0) {
		// 		$(".a_mian_fill").css("width","50%");
		// 		$(".award_con_list img").eq(0).attr("src","images/default_selected_reward_img_1.png");
		// 		$(".lafite_list1 .aw_con_list_font div").css("color","#FFEE2D");
		// 		$(".lafite_list1 .aw_con_list_font div span").css("color","#FFEE2D");
		// 		$(".lafite_list1 .aw_con_list_font .aw_tudi").css("color","white");
		// 	}else {
		// 		// 即将完成样式
		// 		if(indexs == 11) {
		// 			$(".lafite_list"+(indexs+2)+" img").attr("src","images/default_selected_reward_img_2.png");
		// 		}else {
		// 			$(".lafite_list"+(indexs+2)+" img").attr("src","images/default_selected_reward_img_1.png");
		// 		}
				
		// 		$(".lafite_list"+(indexs+2)+" .aw_con_list_font div").css("color","#FFEE2D");
		// 		$(".lafite_list"+(indexs+2)+" .aw_con_list_font div span").css("color","#FFEE2D");
		// 		$(".lafite_list"+(indexs+2)+" .aw_con_list_font .aw_tudi").css("color","white");
		// 	}
			
		// 	// 已完成 
		// 	for(var j = 0;j < indexs+1; j++) {
		// 		$(".lafite_list"+(j+1)+" .aw_con_list_font div").html('<img src="images/default_already_img.png"/>');
		// 	}

		// 	// console.log(res);
			
		// });

			// var page1 = 1;
			function showpage() {
				$(".table_page_middle span").text(page);
				// 收徒总榜
				$.post(Url4,{"phoneNum": uid,"access_token": token,"curPage": page},function(res){
					$(".table_page_middle font").text(Math.ceil(res.data.totalCount/10));
					console.log(res);
					if(Math.ceil(res.data.totalCount/10) == 1) {
						$(".table_page_right").css("color","#939393");
					}
					if(res.data.totalCount == 0) {
						$(".table_page_middle span").text("0");
						$(".table_page_right").css("color","#939393");
					}
					console.log(res.data);
					// 702active新增 当徒弟列表为空时不报错
					if(res.data.studentslist.length !== 0) {
						for(var i = 0; i < 10; i++) {
							var name = res.data.studentslist[i].nickName,
								status = res.data.studentslist[i].isValid,
								data = res.data.studentslist[i].registerDate,
								status2;
								if(status == 0) {
									status2 = "无效";
								}else if(status == 1) {
									status2 = "有效";
								}else if (status == 2) {
									status2 = "异常";
								}
							$(".tudi_false").before("<tr class='fuck'><td>"+name+"</td><td>"+data+"</td><td>"+status2+"</td></tr>");
						}
					}else {
						console.error("studentslist没有值！");
					}
				});
			}
			showpage();

		$(".table_page_left").click(function() {
			page--;
			if(page <= 1) {
				// 处理分子分母为0的情况
				if($(".table_page_middle font").text() == 0) {
					page =0;
				}else {
					page = 1;
					$(".table_page_left").css("color","#939393");
					$(".table_page_right").css("color","#00A5F4");
				}
			}else {
				$(".table_page_right").css("color","#00A5F4");
			}
			$(".fuck").remove();
			showpage();
		});
		$(".table_page_right").click(function() {
			page++;
			if(page >= Number($(".table_page_middle font").text())) {
				page = Number($(".table_page_middle font").text());
				$(".table_page_right").css("color","#939393");
				// 处理分子分母为0的情况
				if($(".table_page_middle span").text() == 0) {
					$(".table_page_left").css("color","#939393");
				}else {
					$(".table_page_left").css("color","#00A5F4");
				}
			}else {
				$(".table_page_left").css("color","#00A5F4");
			}
			$(".fuck").remove();
			showpage();
		});
	}
	init();
	Ajaxfn();

	// 抽奖
   //  var rotateTimeOut = function (){
   //      $('#rotate').rotate({
   //          angle:0,
   //          animateTo:2160,
   //          duration:8000,
   //          callback:function (){
   //              alert('网络超时，请检查您的网络设置！');
   //          }
   //      });
   //  };
   //  var bRotate = false;

   //  var rotateFn = function (awards, angles, txt){
   //      bRotate = !bRotate;
   //      $('#rotate').stopRotate();
   //      $('#rotate').rotate({
   //          angle:0,
   //          animateTo:angles+2810,
   //          duration:8000,
   //          callback:function (){
   //          	$(".turntable-bg").hide();
   //          	$('.cover_fuck,.cover_quit').css({"display": "block","animation": "action_translateY 2s linear", "animation-fill-mode":"forwards"});
   //              $(".cover_fuck").text("+"+parseInt(txt));
   //              bRotate = !bRotate;
   //          }
   //      })
   //  };

   //  $('.pointer').click(function (){
   //  	// 防止多次点击
   //  	if(bRotate)return;
   //  	var Url3 = testname+"/yfax-htt-api/api/htt/doHolidayActivityLuckyDraw";
   //  	$.post(Url3,{"phoneNum": uid1,"access_token": token1},function(res){
			// var times = res.data.remainlotteryTimes,
			// 	item = res.data.resultCode;
			// $(".cover_num span").text(times);
			// // var item = 1;
			// // console.log(res);
			// if(item == -1) {
			// 	// alert("抽奖次数已用完");
			// }else {
			// 	$('.cover_fuck').hide();
			// 	switch (item) {
		 //            case 0:
		 //                rotateFn(0, 360, '88888金币');
		 //                break;
		 //            case 1:
		 //                rotateFn(1, 45, '200金币');
		 //                break;
		 //            case 2:
		 //                rotateFn(2, 90, '10000金币');
		 //                break;
		 //            case 3:
		 //                rotateFn(3, 135, '500金币');
		 //                break;
		 //            case 4:
		 //                rotateFn(4, 180, '8888金币');
		 //                break;
		 //            case 5:
		 //                rotateFn(5, 225, '500M流量');
		 //                break;
		 //            case 6:
		 //                rotateFn(6, 270, '5000金币');
		 //                break;
		 //            case 7:
		 //                rotateFn(7, 315, '30元话费');
		 //                break;
		 //        }
			// }  
	  //   });
   //  });
})