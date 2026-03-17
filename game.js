// Game Application Logic

const app = {
    // State
    currentView: 'home',
    draggedItem: null,
    score: 0,
    
    // Data
    bones: [
        { id: 'b1', name: '尺骨', type: '长骨' },
        { id: 'b2', name: '掌骨', type: '长骨' },
        { id: 'b3', name: '指骨', type: '长骨' },
        { id: 'b4', name: '股骨', type: '长骨' },
        { id: 'b5', name: '腕骨', type: '短骨' },
        { id: 'b6', name: '跗骨', type: '短骨' },
        { id: 'b7', name: '胸骨', type: '扁骨' },
        { id: 'b8', name: '顶骨', type: '扁骨' },
        { id: 'b9', name: '髋骨', type: '扁骨' },
        { id: 'b10', name: '椎骨', type: '不规则骨' },
        { id: 'b11', name: '蝶骨', type: '不规则骨' },
        { id: 'b12', name: '下颌骨', type: '不规则骨' }
    ],

    cases: [
        {
            title: "\u4e34\u5e8a\u590d\u4e60 1\uff1a\u65b9\u4f4d\u672f\u8bed\u7684\u57fa\u51c6",
            desc: "\u5728\u8bb0\u5f55\u4e00\u4f4d\u504f\u762b\u8001\u4eba\u7684\u5eb7\u590d\u8fdb\u5c55\u65f6\uff0c\u4f60\u9700\u8981\u63cf\u8ff0\u4ed6\u56db\u80a2\u7684\u6d3b\u52a8\u53d7\u9650\u8303\u56f4\u3002\u5173\u4e8e\u6807\u51c6\u89e3\u5256\u5b66\u59ff\u52bf\uff0c\u4ee5\u4e0b\u54ea\u9879\u6700\u5bb9\u6613\u88ab\u521d\u5b66\u8005\u5ffd\u7565\uff1f",
            options: [
                { text: "A. 身体直立，面向前", correct: false, feedback: "这是基本要点。" },
                { text: "B. 上肢自然下垂，掌心向内", correct: false, feedback: "错误。自然下垂通常掌心向内，但标准姿势要求掌心向前。" },
                { text: "C. 上肢下垂，掌心向前", correct: true, feedback: "完全正确！很多初学者会忽略掌心必须向前，这对准确描述前臂结构至关重要。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 2\uff1a\u9aa8\u7684\u5206\u7c7b\u4e0e\u627f\u91cd",
            desc: "\u5728\u8bbe\u8ba1\u8001\u5e74\u9632\u8dcc\u5012\u64cd\u65f6\u9700\u8981\u4e86\u89e3\u4e0d\u540c\u9aa8\u9abc\u7684\u7279\u6027\u3002\u4eba\u4f53\u56db\u80a2\u4e2d\u771f\u6b63\u8d77\u652f\u6491\u4f5c\u7528\u3001\u5e76\u4f5c\u4e3a\u8fd0\u52a8\u6760\u6746\u7684\u9aa8\u9abc\u4e3b\u8981\u662f\u54ea\u4e00\u7c7b\uff1f",
            options: [
                { text: "A. 短骨", correct: false, feedback: "短骨（如跗骨）能分散压力，但不是主要的支撑杆。" },
                { text: "B. 长骨", correct: true, feedback: "准确！长骨主要分布在四肢，充当杠杆。股骨大转子等是老年人跌倒易骨折的部位。" },
                { text: "C. 扁骨", correct: false, feedback: "扁骨主要用于保护内部器官（如颅骨）。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 3\uff1a\u65b0\u751f\u513f\u9885\u7684\u7279\u5f81",
            desc: "\u4e86\u89e3\u4eba\u4f53\u53d1\u80b2\u6709\u52a9\u4e8e\u7406\u89e3\u9aa8\u9abc\u6f14\u53d8\u3002\u5173\u4e8e\u65b0\u751f\u513f\u9885\u9aa8\u7279\u5f81\uff0c\u4ee5\u4e0b\u8bf4\u6cd5\u6b63\u786e\u7684\u662f\uff1f",
            options: [
                { text: "A. 面颅大，脑颅小", correct: false, feedback: "相反，新生儿是大脑优先发育，脑颅大。" },
                { text: "B. 各颅骨间未完全愈合，形成颅囟", correct: true, feedback: "正确！最明显的是前囟和后囟，为大脑生长留出空间。" },
                { text: "C. 鼻旁窦已经完全发育", correct: false, feedback: "新生儿鼻旁窦尚未发育。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 4\uff1a\u9aa8\u7684\u57fa\u672c\u6784\u9020",
            desc: "\u8001\u5e74\u4eba\u5bb9\u6613\u9aa8\u6298\uff0c\u4e0e\u9aa8\u9abc\u5185\u90e8\u7ed3\u6784\u9000\u5316\u6709\u5173\u3002\u6784\u6210\u4e00\u5757\u5b8c\u6574\u6d3b\u4f53\u9aa8\u7684\u4e3b\u8981\u6784\u9020\u5305\u62ec\uff1f",
            options: [
                { text: "A. 只有骨密质和骨松质", correct: false, feedback: "这只是骨质部分。" },
                { text: "B. 骨质、骨膜、骨髓", correct: true, feedback: "正确！骨质分密质和松质；骨膜含血管神经；骨髓在髓腔和松质内。" },
                { text: "C. 无机质和有机质", correct: false, feedback: "这是化学成分。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 5\uff1a\u690e\u9aa8\u7684\u4e00\u822c\u5f62\u6001",
            desc: "\u5728\u7ed9\u8001\u4eba\u505a\u80cc\u90e8\u6309\u6469\u65f6\uff0c\u80fd\u6478\u5230\u80cc\u90e8\u6b63\u4e2d\u7ebf\u4e0a\u4e00\u4e32\u7a81\u8d77\uff0c\u8fd9\u662f\u690e\u9aa8\u7684\u54ea\u4e00\u90e8\u5206\uff1f",
            options: [
                { text: "A. 椎体", correct: false, feedback: "椎体在前方承重，摸不到。" },
                { text: "B. 横突", correct: false, feedback: "横突在两侧向外突出。" },
                { text: "C. 棘突", correct: true, feedback: "正确！向后方伸出的突起即为棘突，在体表可触及。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 6\uff1a\u9888\u690e\u7684\u7279\u6b8a\u7ed3\u6784",
            desc: "\u9888\u690e\u75c5\u5bb9\u6613\u538b\u8feb\u690e\u52a8\u8109\u5bfc\u81f4\u8001\u4eba\u5934\u6655\u3002\u9888\u690e\u533a\u522b\u4e8e\u5176\u4ed6\u690e\u9aa8\u7684\u6700\u663e\u8457\u7279\u5f81\u662f\u4ec0\u4e48\uff1f",
            options: [
                { text: "A. 椎体最大", correct: false, feedback: "腰椎的椎体最大。" },
                { text: "B. 有横突孔", correct: true, feedback: "正确！所有颈椎都有横突孔，椎动脉和静脉从中穿过。" },
                { text: "C. 棘突最长", correct: false, feedback: "只有第7颈椎棘突特别长。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 7\uff1a\u80f8\u9aa8\u4e0e\u808b\u7684\u8fde\u63a5",
            desc: "\u5fc3\u80ba\u590d\u82cf\u6309\u538b\u65f6\u9700\u8981\u627e\u51c6\u80f8\u9aa8\u3002\u80f8\u9aa8\u67c4\u4e0e\u80f8\u9aa8\u4f53\u8fde\u63a5\u5904\u5fae\u5411\u524d\u7a81\uff0c\u79f0\u4e3a\u80f8\u9aa8\u89d2\u3002\u5b83\u5e73\u5bf9\u54ea\u4e00\u7ed3\u6784\uff1f",
            options: [
                { text: "A. 第1肋", correct: false, feedback: "第1肋在锁骨下方，被锁骨掩盖。" },
                { text: "B. 第2肋", correct: true, feedback: "正确！胸骨角平对第2肋，是临床上计数肋骨的重要标志。" },
                { text: "C. 第3肋", correct: false, feedback: "位置不正确。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 8\uff1a\u9aa8\u7684\u5316\u5b66\u6210\u5206",
            desc: "\u4e3a\u4ec0\u4e48\u5c0f\u5b69\u5b50\u6454\u8de4\u4e0d\u5bb9\u6613\u9aa8\u6298\uff0c\u800c\u8001\u4eba\u8f7b\u8f7b\u4e00\u6454\u5c31\u5bb9\u6613\u9aa8\u6298\uff1f\u8fd9\u4e0e\u9aa8\u7684\u5316\u5b66\u6210\u5206\u6709\u5173\u3002",
            options: [
                { text: "A. 老人骨中有机质增多", correct: false, feedback: "有机质提供韧性，老人有机质是减少的。" },
                { text: "B. 老人骨中无机质比例相对增加", correct: true, feedback: "正确！无机质使骨变硬变脆，老人由于钙质虽然流失但总体有机质流失更多，导致脆性增加。" },
                { text: "C. 老人骨中水分增加", correct: false, feedback: "老人体内水分是减少的。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 9\uff1a\u80a9\u80db\u9aa8\u7684\u4f4d\u7f6e",
            desc: "\u8001\u4eba\u5728\u7a7f\u8863\u4f38\u81c2\u65f6\u80a9\u90e8\u75bc\u75db\uff0c\u4f60\u89c2\u5bdf\u4ed6\u7684\u80a9\u80db\u9aa8\u3002\u80a9\u80db\u9aa8\u5c5e\u4e8e\u54ea\u7c7b\u9aa8\uff0c\u4f4d\u4e8e\u80f8\u5ed3\u4f55\u5904\uff1f",
            options: [
                { text: "A. 扁骨，胸廓后面两侧", correct: true, feedback: "正确！肩胛骨是扁骨，贴于胸廓后外面。" },
                { text: "B. 不规则骨，胸廓前面", correct: false, feedback: "前面是胸骨和锁骨。" },
                { text: "C. 短骨，颈部下方", correct: false, feedback: "不是短骨。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 10\uff1a\u8111\u9885\u9aa8\u4e0e\u9762\u9885\u9aa8",
            desc: "\u4eba\u7684\u5934\u9aa8\u5206\u4e3a\u8111\u9885\u9aa8\u548c\u9762\u9885\u9aa8\u3002\u4ee5\u4e0b\u54ea\u5757\u9aa8\u5c5e\u4e8e\u9762\u9885\u9aa8\uff1f",
            options: [
                { text: "A. 额骨", correct: false, feedback: "额骨参与构成脑颅腔，保护大脑。" },
                { text: "B. 颞骨", correct: false, feedback: "颞骨在头部两侧，属于脑颅骨。" },
                { text: "C. 下颌骨", correct: true, feedback: "正确！下颌骨参与构成口腔，属于面颅骨，且是唯一可活动的颅骨。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 11\uff1a\u7ffc\u70b9\u7684\u4e34\u5e8a\u610f\u4e49",
            desc: "\u8001\u4eba\u5934\u90e8\u592a\u9633\u7a74\u9644\u8fd1\u53d7\u5230\u4fa7\u9762\u649e\u51fb\u975e\u5e38\u5371\u9669\u3002\u8fd9\u4e2a\u90e8\u4f4d\u88ab\u79f0\u4e3a\u201c\u7ffc\u70b9\u201d\uff0c\u5b83\u7684\u89e3\u5256\u5b66\u7279\u70b9\u662f\u4ec0\u4e48\uff1f",
            options: [
                { text: "A. 头骨最厚的部位", correct: false, feedback: "相反，它是颅骨最薄弱的部分之一。" },
                { text: "B. 额、顶、颞、蝶四骨汇合处，内有硬脑膜中动脉前支", correct: true, feedback: "正确！此处骨质薄，受撞击极易骨折并撕裂内部的动脉，引起硬膜外血肿，危及生命。" },
                { text: "C. 是三叉神经的穿出点", correct: false, feedback: "不是三叉神经的主要穿出点。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 12\uff1a\u9885\u4e2d\u7a9d\u7684\u7ed3\u6784",
            desc: "\u8111\u90e8\u75be\u75c5\u5e38\u6d89\u53ca\u7279\u5b9a\u533a\u57df\u3002\u4f4d\u4e8e\u9885\u5e95\u4e2d\u592e\uff0c\u5bb9\u7eb3\u8111\u5782\u4f53\uff08\u91cd\u8981\u5185\u5206\u6ccc\u817a\uff09\u7684\u7ed3\u6784\u662f\uff1f",
            options: [
                { text: "A. 鸡冠", correct: false, feedback: "鸡冠在颅前窝正中。" },
                { text: "B. 垂体窝（蝶鞍内）", correct: true, feedback: "正确！蝶骨体上面的凹陷称为垂体窝，容纳脑垂体。" },
                { text: "C. 枕骨大孔", correct: false, feedback: "在颅后窝。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 13\uff1a\u9aa8\u9ad3\u7684\u529f\u80fd",
            desc: "\u6709\u4e9b\u8001\u4eba\u7684\u9020\u8840\u529f\u80fd\u51cf\u5f31\u3002\u5173\u4e8e\u6210\u4eba\u9aa8\u9ad3\u7684\u5206\u5e03\u548c\u529f\u80fd\uff0c\u6b63\u786e\u7684\u662f\uff1f",
            options: [
                { text: "A. 成人所有骨髓均为红骨髓", correct: false, feedback: "成人骨干髓腔内转变为黄骨髓。" },
                { text: "B. 成人由于年龄大，全是黄骨髓不再造血", correct: false, feedback: "扁骨和不规则骨中终身保留红骨髓。" },
                { text: "C. 红骨髓有造血功能，存在于骨松质内", correct: true, feedback: "正确！成人椎骨、胸骨等松质网眼内终身保留红骨髓，维持造血功能。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 14\uff1a\u8170\u690e\u7a7f\u523a\u5b9a\u4f4d",
            desc: "\u4e34\u5e8a\u4e0a\u8fdb\u884c\u8170\u690e\u7a7f\u523a\u62bd\u53d6\u8111\u810a\u6db2\u5316\u9a8c\uff0c\u901a\u5e38\u9009\u62e9\u8170\u690e\u4e4b\u95f4\u8fde\u7ebf\u8fdb\u884c\uff0c\u56e0\u4e3a\u8170\u690e\u5728\u8fd9\u4e2a\u90e8\u4f4d\u7684\u7ed3\u6784\u7279\u70b9\u662f\uff1f",
            options: [
                { text: "A. 棘突细长且向下方倾斜", correct: false, feedback: "这是胸椎的特点，呈叠瓦状。" },
                { text: "B. 棘突宽短呈板状，平伸向后，间隙较宽", correct: true, feedback: "正确！腰椎棘突间隙宽，便于针头刺入椎管，且不会损伤脊髓。" },
                { text: "C. 椎间孔特别大", correct: false, feedback: "穿刺从后方棘突间隙进入，不是侧方椎间孔。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 15\uff1a\u771f\u5047\u808b\u7684\u533a\u5206",
            desc: "\u80f8\u5ed3\u7531\u80f8\u690e\u3001\u80f8\u9aa8\u548c\u808b\u7ec4\u6210\u3002\u5173\u4e8e\u808b\u7684\u5206\u7c7b\uff0c\u524d\u7aef\u501f\u808b\u8f6f\u9aa8\u76f4\u63a5\u8fde\u4e8e\u80f8\u9aa8\u7684\u79f0\u4e3a\u771f\u808b\uff0c\u5b83\u4eec\u662f\u6307\uff1f",
            options: [
                { text: "A. 第1~7对肋", correct: true, feedback: "正确！第1~7对肋直接与胸骨相连。" },
                { text: "B. 第8~10对肋", correct: false, feedback: "它们连于上一位肋软骨形成肋弓，称假肋。" },
                { text: "C. 第11~12对肋", correct: false, feedback: "前端游离于腹壁肌层中，称浮肋。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 16\uff1a\u4eba\u4f53\u5f62\u6001\u5b66\u7ec4\u6210",
            desc: "\u300a\u4eba\u4f53\u5f62\u6001\u5b66\u300b\u8fd9\u95e8\u8bfe\u7ed3\u5408\u4e86\u591a\u4e2a\u5b66\u79d1\u3002\u5176\u4e2d\u7814\u7a76\u4eba\u4f53\u5668\u5b98\u7ec4\u7ec7\u7684\u5fae\u7ec6\u7ed3\u6784\u53ca\u5176\u4e0e\u529f\u80fd\u5173\u7cfb\u7684\u662f\uff1f",
            options: [
                { text: "A. 人体解剖学", correct: false, feedback: "解剖学研究肉眼可见的宏观结构。" },
                { text: "B. 组织学", correct: true, feedback: "正确！组织学主要通过显微镜研究细胞组织的微观结构。" },
                { text: "C. 胚胎学", correct: false, feedback: "胚胎学研究个体发生发展。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 17\uff1a\u89e3\u5256\u5b66\u65b9\u4f4d\u8bcd-\u6df1\u6d45",
            desc: "\u672f\u8bed\u201c\u6df1\u201d\u548c\u201c\u6d45\u201d\u5728\u89e3\u5256\u5b66\u4e2d\u662f\u5982\u4f55\u5b9a\u4e49\u7684\uff1f",
            options: [
                { text: "A. 靠近身体的前面为浅", correct: false, feedback: "那是前（腹侧）。" },
                { text: "B. 靠近皮肤表面为浅，远离表面为深", correct: true, feedback: "正确！例如浅筋膜和深筋膜的区别。" },
                { text: "C. 靠近头部为浅", correct: false, feedback: "那是上（颅侧）。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 18\uff1a\u4eba\u4f53\u7684\u5207\u9762",
            desc: "CT\u6216MRI\u626b\u63cf\u7ecf\u5e38\u9700\u8981\u770b\u4e0d\u540c\u5207\u9762\u56fe\u50cf\u3002\u5c06\u4eba\u4f53\u5206\u4e3a\u5de6\u53f3\u76f8\u7b49\u4e24\u534a\u7684\u5207\u9762\u662f\uff1f",
            options: [
                { text: "A. 冠状面", correct: false, feedback: "冠状面将身体分为前后两部分。" },
                { text: "B. 水平面", correct: false, feedback: "分为上下两部分。" },
                { text: "C. 正中矢状面", correct: true, feedback: "正确！矢状面将身体分为左右两半，过正中线的即为正中矢状面。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 19\uff1a\u4e0b\u80a2\u5e26\u9aa8",
            desc: "\u8fde\u63a5\u8eaf\u5e72\u548c\u4e0b\u80a2\u7684\u9aa8\u9abc\u88ab\u79f0\u4e3a\u4e0b\u80a2\u5e26\u9aa8\uff0c\u5728\u6210\u4eba\u5b83\u662f\u7531\u54ea\u4e09\u5757\u9aa8\u6108\u5408\u800c\u6210\u7684\uff1f",
            options: [
                { text: "A. 髂骨、坐骨、耻骨", correct: true, feedback: "正确！这三块骨在软骨化骨后融合为髋骨。" },
                { text: "B. 股骨、胫骨、腓骨", correct: false, feedback: "这是下肢自由骨。" },
                { text: "C. 骶骨、尾骨、髋骨", correct: false, feedback: "骶尾骨属于躯干骨。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 20\uff1a\u9885\u5185\u6700\u4e3b\u8981\u7684\u6795\u9aa8\u7ed3\u6784",
            desc: "\u9885\u540e\u7a9d\u6709\u4e00\u5927\u5b54\uff0c\u8111\u5e72\u901a\u8fc7\u6b64\u5b54\u4e0e\u810a\u9ad3\u76f8\u8fde\u3002\u8fd9\u662f\u4ec0\u4e48\u7ed3\u6784\uff1f",
            options: [
                { text: "A. 破裂孔", correct: false, feedback: "较小，有血管神经通过。" },
                { text: "B. 颈静脉孔", correct: false, feedback: "有脑神经和颈静脉通过。" },
                { text: "C. 枕骨大孔", correct: true, feedback: "正确！延髓在此处向下延续为脊髓，非常关键。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 21\uff1a\u8155\u9aa8\u7684\u5206\u7c7b",
            desc: "\u8001\u4eba\u8dcc\u5012\u65f6\u5e38\u5e38\u7528\u624b\u6491\u5730\uff0c\u5bfc\u81f4\u8155\u90e8\u53d7\u4f24\u3002\u8155\u9aa8\u5171\u67098\u5757\uff0c\u4ece\u5f62\u6001\u4e0a\u770b\u5b83\u4eec\u5c5e\u4e8e\uff1f",
            options: [
                { text: "A. 短骨", correct: true, feedback: "正确！短骨近似立方形，成群分布，利于运动并分散冲击力。" },
                { text: "B. 长骨", correct: false, feedback: "长骨起杠杆作用。" },
                { text: "C. 不规则骨", correct: false, feedback: "椎骨是不规则骨。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 22\uff1a\u9f3b\u65c1\u7aa6\u7684\u4f4d\u7f6e",
            desc: "\u8001\u4eba\u611f\u5192\u65f6\u5e38\u8bf4\u5934\u75db\uff0c\u53ef\u80fd\u662f\u9f3b\u65c1\u7aa6\u708e\u5f15\u8d77\u7684\u3002\u4ee5\u4e0b\u54ea\u5757\u9aa8\u5185\u90e8\u4e0d\u542b\u9f3b\u65c1\u7aa6\uff1f",
            options: [
                { text: "A. 上颌骨", correct: false, feedback: "含有最大的上颌窦。" },
                { text: "B. 额骨", correct: false, feedback: "含有额窦。" },
                { text: "C. 下颌骨", correct: true, feedback: "正确！下颌骨内没有含气空腔，鼻旁窦主要位于上颌骨、额骨、蝶骨和筛骨内。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 23\uff1a\u9acc\u9aa8\u7684\u4f5c\u7528",
            desc: "\u819d\u5173\u8282\u524d\u65b9\u6709\u4e00\u5757\u9aa8\uff0c\u8001\u4eba\u7ecf\u5e38\u7531\u4e8e\u8f6f\u9aa8\u78e8\u635f\u5bfc\u81f4\u6b64\u5904\u75bc\u75db\u3002\u8fd9\u5757\u9aa8\u662f\uff1f",
            options: [
                { text: "A. 腓骨", correct: false, feedback: "在小腿外侧。" },
                { text: "B. 髌骨", correct: true, feedback: "正确！髌骨是人体最大的籽骨，包含在股四头肌腱内，起保护膝关节和增加肌肉力学效应的作用。" },
                { text: "C. 胫骨", correct: false, feedback: "在小腿内侧承重。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 24\uff1a\u9686\u690e\u7684\u5b9a\u4f4d",
            desc: "\u533b\u751f\u5728\u8ba1\u6570\u68d8\u7a81\u65f6\uff0c\u5e38\u4ee5\u9888\u90e8\u540e\u9762\u6700\u660e\u663e\u7684\u4e00\u4e2a\u68d8\u7a81\u4f5c\u4e3a\u6807\u5fd7\uff0c\u5b83\u662f\uff1f",
            options: [
                { text: "A. 第7颈椎（隆椎）", correct: true, feedback: "正确！第7颈椎的棘突特别长，末端不分叉，低头时最隆起，是重要的体表标志。" },
                { text: "B. 第1颈椎（寰椎）", correct: false, feedback: "没有椎体和棘突。" },
                { text: "C. 第2颈椎（枢椎）", correct: false, feedback: "其上方有齿突，但棘突不是最明显的。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 25\uff1a\u810a\u67f1\u7684\u751f\u7406\u5f2f\u66f2",
            desc: "\u6b63\u5e38\u6210\u5e74\u4eba\u7684\u810a\u67f1\u4ece\u4fa7\u9762\u770b\u6709\u56db\u4e2a\u751f\u7406\u5f2f\u66f2\uff0c\u5176\u4e2d\u5411\u540e\u51f8\u7684\u5f2f\u66f2\u662f\uff1f",
            options: [
                { text: "A. 颈曲和腰曲", correct: false, feedback: "这两个弯曲是向前凸的。" },
                { text: "B. 胸曲和骶曲", correct: true, feedback: "正确！胸骨和骶部呈向后凸的弯曲，增加了躯干的容量。" },
                { text: "C. 全都是向后凸", correct: false, feedback: "有前凸有后凸才能像弹簧一样缓冲震荡。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 26\uff1a\u4e0a\u80a2\u9aa8\u7684\u6570\u91cf",
            desc: "\u4eba\u4f53\u9644\u80a2\u9aa8\u7531\u4e0a\u4e0b\u80a2\u7ec4\u6210\uff0c\u975e\u5e38\u7075\u6d3b\u3002\u4e00\u4fa7\u4e0a\u80a2\u9aa8\u7684\u6570\u91cf\u603b\u5171\u6709\u591a\u5c11\u5757\uff1f",
            options: [
                { text: "A. 32块", correct: true, feedback: "正确！一侧上肢带骨2块(锁骨/肩胛骨)+自由肢骨30块(肱1/桡1/尺1/腕8/掌5/指14)=32块。两侧共64块。" },
                { text: "B. 31块", correct: false, feedback: "数量不对。" },
                { text: "C. 62块", correct: false, feedback: "这是双侧下肢骨的总数。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 27\uff1a\u9aa8\u6027\u9f3b\u4e2d\u9694\u7684\u7ec4\u6210",
            desc: "\u5f88\u591a\u8001\u4eba\u4f1a\u6709\u9f3b\u4e2d\u9694\u504f\u66f2\u5bfc\u81f4\u547c\u5438\u4e0d\u7545\u3002\u6784\u6210\u9aa8\u6027\u9f3b\u4e2d\u9694\u7684\u9aa8\u4e3b\u8981\u662f\uff1f",
            options: [
                { text: "A. 上颌骨和腭骨", correct: false, feedback: "参与构成硬腭。" },
                { text: "B. 筛骨垂直板和犁骨", correct: true, feedback: "正确！这两块骨形成鼻腔正中的骨性间隔。" },
                { text: "C. 鼻骨和下鼻甲", correct: false, feedback: "鼻骨在鼻背，下鼻甲在侧壁。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 28\uff1a\u9aa8\u6298\u4fee\u590d",
            desc: "\u8001\u5e74\u4eba\u53d1\u751f\u9aa8\u6298\u540e\u6108\u5408\u975e\u5e38\u7f13\u6162\u3002\u9aa8\u9abc\u54ea\u4e00\u90e8\u5206\u7684\u7ec6\u80de\u5bf9\u9aa8\u7684\u751f\u957f\u548c\u9aa8\u6298\u4fee\u590d\u8d77\u5230\u4e86\u51b3\u5b9a\u6027\u4f5c\u7528\uff1f",
            options: [
                { text: "A. 骨松质的红骨髓", correct: false, feedback: "负责造血。" },
                { text: "B. 骨膜中的成骨细胞", correct: true, feedback: "正确！骨膜尤其内层富含成骨细胞和破骨细胞，控制着骨的修复、重建和加粗。" },
                { text: "C. 关节软骨", correct: false, feedback: "覆盖在关节面，无修复骨干的作用。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 29\uff1a\u9aa8\u6027\u53e3\u8154\u7684\u9876",
            desc: "\u6709\u4e9b\u8001\u4eba\u7684\u5047\u7259\u662f\u4e0a\u989a\u5168\u6258\u3002\u5047\u7259\u8d34\u5408\u7684\u9aa8\u6027\u786c\u816d\u4e3b\u8981\u662f\u7531\u54ea\u4e9b\u9aa8\u6784\u6210\u7684\uff1f",
            options: [
                { text: "A. 蝶骨和筛骨", correct: false, feedback: "这在颅底更深和靠上的位置。" },
                { text: "B. 额骨和鼻骨", correct: false, feedback: "在面部上方前方。" },
                { text: "C. 上颌骨腭突和腭骨水平板", correct: true, feedback: "正确！这两个部分共同构成骨性口腔的顶（即骨性鼻腔的底）。" }
            ]
        },
        {
            title: "\u4e34\u5e8a\u590d\u4e60 30\uff1a\u603b\u590d\u4e60\uff1a\u5168\u8eab\u4f53\u79ef\u4e0e\u627f\u91cd",
            desc: "\u5728\u4eba\u4f53\u7684\u6240\u6709\u9aa8\u9abc\u4e2d\uff0c\u54ea\u4e00\u5757\u9aa8\u5934\u4e0d\u4ec5\u6700\u957f\u3001\u6700\u7ed3\u5b9e\uff0c\u4e00\u65e6\u4e2d\u8001\u5e74\u4eba\u8dcc\u5012\u5bfc\u81f4\u5176\u9888\u90e8\u9aa8\u6298\uff0c\u5e38\u88ab\u79f0\u4e3a\u201c\u4eba\u751f\u6700\u540e\u4e00\u6b21\u9aa8\u6298\u201d\uff1f",
            options: [
                { text: "A. 胫骨", correct: false, feedback: "胫骨虽粗壮并承重，但不是最长的，也不被此称呼。" },
                { text: "B. 股骨", correct: true, feedback: "完全正确！股骨是人体最长最结实的骨。老年人极易发生股骨颈骨折，由于长时间卧床常引发致死并发症，因此被称为“人生最后一次骨折”。" },
                { text: "C. 肱骨", correct: false, feedback: "这是上肢骨，不承重躯干。" }
            ]
        }
    ],


    currentCaseIndex: 0,

    // Initialization
    init() {
        this.setupNavigation();
        this.initClassifyGame();
        this.initAgingSimulator();
        this.loadCase();
    },

    // Navigation
    setupNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.dataset.target;
                this.switchView(target);
            });
        });
    },

    switchView(viewId) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if(btn.dataset.target === viewId) btn.classList.add('active');
        });

        // Update views
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(viewId).classList.add('active');
        this.currentView = viewId;
    },

    // Classification Game Logic
    initClassifyGame() {
        const pool = document.getElementById('draggable-pool');
        pool.innerHTML = '';
        
        // Shuffle and render
        [...this.bones].sort(() => Math.random() - 0.5).forEach(bone => {
            const el = document.createElement('div');
            el.className = 'bone-item';
            el.draggable = true;
            el.textContent = bone.name;
            el.dataset.id = bone.id;
            el.dataset.type = bone.type;
            
            el.addEventListener('dragstart', (e) => {
                this.draggedItem = el;
                e.dataTransfer.effectAllowed = 'move';
                setTimeout(() => el.style.opacity = '0.5', 0);
            });
            
            el.addEventListener('dragend', () => {
                el.style.opacity = '1';
                this.draggedItem = null;
                document.querySelectorAll('.zone').forEach(z => z.classList.remove('drag-over'));
            });

            pool.appendChild(el);
        });

        // Setup drop zones
        document.querySelectorAll('.zone').forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                if (this.draggedItem) {
                    const expectedType = zone.dataset.type;
                    const actualType = this.draggedItem.dataset.type;
                    
                    if (expectedType === actualType) {
                        zone.querySelector('.items-container').appendChild(this.draggedItem);
                        this.draggedItem.classList.add('correct');
                        this.draggedItem.draggable = false;
                        this.showToast('分类正确！');
                        this.checkClassifyWin();
                    } else {
                        this.showToast('分类错误，再仔细想想课件里的定义哦。');
                        // Optional: add shake animation
                    }
                }
            });
        });
    },

    checkClassifyWin() {
        const remaining = document.getElementById('draggable-pool').children.length;
        if (remaining === 0) {
            setTimeout(() => {
                alert('恭喜你，完成了所有骨骼的分类！掌握得非常扎实。');
            }, 500);
        }
    },

    // Aging Simulator Logic
    initAgingSimulator() {
        const slider = document.getElementById('age-slider');
        const ageDisplay = document.getElementById('age-display');
        
        // Image Elements
        const skeletonImg = document.getElementById('skeleton-img');
        const densityImg = document.getElementById('density-img');
        const postureImg = document.getElementById('posture-img');
        
        // Info Cards
        const densityInfo = document.getElementById('density-info');
        const spineInfo = document.getElementById('spine-info');

        slider.addEventListener('input', (e) => {
            const age = parseInt(e.target.value);
            ageDisplay.textContent = age;
            
            // Calculate progress (0 to 1) based on age 25 to 85
            let progress = Math.max(0, (age - 25) / 60);

            // 1. Skeleton Overlay fading (Young to Old)
            if(progress > 0.5) {
                skeletonImg.src = 'elderly_skeleton_' + this.findLatestImageString('elderly_skeleton') + '.png';
            } else {
                skeletonImg.src = 'young_skeleton_' + this.findLatestImageString('young_skeleton') + '.png';
            }

            // 2. Bone Density Images
            if(progress > 0.5) {
                densityImg.src = 'bone_density_old_' + this.findLatestImageString('bone_density_old') + '.png';
                densityInfo.style.borderLeftColor = 'var(--accent)';
            } else {
                densityImg.src = 'bone_density_young_' + this.findLatestImageString('bone_density_young') + '.png';
                densityInfo.style.borderLeftColor = 'var(--primary)';
            }

            // 3. Posture Image Opacity
            postureImg.style.opacity = progress * 1.5; // Starts showing after halfway

            // Update Text Dynamics
            this.updateAgingText(age, progress, densityInfo, spineInfo);
        });
        
        // Trigger initial load manually to set images
        const event = new Event('input');
        slider.dispatchEvent(event);
    },

    // Helper to extract timestamp string from generated images just for this demo
    findLatestImageString(prefix) {
        // Since we copied the generated files, we need the exact name.
        // We'll just rely on the CSS/HTML to handle the paths properly. 
        // For simplicity in this generated code block, we'll try to use the prefix directly or wildcard in real backend.
        // As a frontend strictly, I am assuming the generated names are known or I will just update index.html directly.
        // Let's modify this to just use a clean filename which we will rename via script.
        return 'clean'; // We will rename the files in bash next to remove the timestamps for easier referencing.
    },

    updateAgingText(age, p, dInfo, sInfo) {
        // Density
        if(age < 40) {
            dInfo.querySelector('p').textContent = "骨骼致密，骨小梁结构紧密，富有弹性，能有效承受压力和冲击力。";
        } else if (age < 60) {
            dInfo.querySelector('p').textContent = "骨量开始流失，无机质比例相对增加，有机质减少，骨骼变得更脆。";
        } else {
            dInfo.querySelector('p').textContent = "骨质疏松显著，骨小梁断裂、变薄，孔隙变大，轻微摔倒极易致骨折。";
        }

        // Spine/Posture
        if(age < 50) {
            sInfo.querySelector('p').textContent = "椎体形态正常，序列挺拔，身高处于巅峰状态。";
        } else if (age < 70) {
            sInfo.querySelector('p').textContent = "椎间盘变薄，水分流失，身高开始出现退缩。";
        } else {
            sInfo.querySelector('p').textContent = "椎体前缘受压吸收变扁，引起典型的老年性驼背（后凸），身高明显变矮。";
        }
    },

    // Clinic Quiz Logic
    loadCase() {
        const caseData = this.cases[this.currentCaseIndex];
        document.getElementById('case-title').textContent = caseData.title;
        document.getElementById('case-description').textContent = caseData.desc;
        
        const optionsPanel = document.getElementById('quiz-options');
        optionsPanel.innerHTML = '';
        document.getElementById('quiz-feedback').style.display = 'none';

        caseData.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            btn.onclick = () => this.handleAnswer(opt, btn);
            optionsPanel.appendChild(btn);
        });
    },

    handleAnswer(option, btnElement) {
        // Disable all buttons
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(b => b.style.pointerEvents = 'none');

        const fbPanel = document.getElementById('quiz-feedback');
        fbPanel.style.display = 'block';
        fbPanel.textContent = option.feedback;
        fbPanel.className = 'feedback-panel ' + (option.correct ? 'success' : 'error');

        if (option.correct) {
            btnElement.classList.add('correct');
            // Advance to next after delay
            setTimeout(() => {
                this.currentCaseIndex++;
                if (this.currentCaseIndex < this.cases.length) {
                    this.loadCase();
                } else {
                    fbPanel.innerHTML = '<strong>太棒了！</strong> 你已经完成了所有临床侦探任务，具备了出色的解剖学分析能力。';
                    fbPanel.innerHTML += '<br><button class="primary-btn pulse" style="margin-top:15px" onclick="app.currentCaseIndex=0;app.loadCase()">重新开始挑战</button>';
                }
            }, 5000);
        } else {
            btnElement.classList.add('wrong');
            // Allow retry
            setTimeout(() => {
                buttons.forEach(b => {
                    if(!b.classList.contains('wrong')) b.style.pointerEvents = 'auto';
                });
            }, 500);
        }
    },

    // Utilities
    showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
