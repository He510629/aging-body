import json

# Generate 30 questions based on the typical anatomy/bone curriculum covered in the PPT.
questions = [
    {
        "title": "临床复习 1：方位术语的基准",
        "desc": "在记录一位偏瘫老人的康复进展时，你需要描述他四肢的活动受限范围。关于标准解剖学姿势，以下哪项最容易被初学者忽略？",
        "options": [
            {"text": "A. 身体直立，面向前", "correct": False, "feedback": "这是基本要点。"},
            {"text": "B. 上肢自然下垂，掌心向内", "correct": False, "feedback": "错误。自然下垂通常掌心向内，但标准姿势要求掌心向前。"},
            {"text": "C. 上肢下垂，掌心向前", "correct": True, "feedback": "完全正确！很多初学者会忽略掌心必须向前，这对准确描述前臂结构至关重要。"}
        ]
    },
    {
        "title": "临床复习 2：骨的分类与承重",
        "desc": "在设计老年防跌倒操时需要了解不同骨骼的特性。人体四肢中真正起支撑作用、并作为运动杠杆的骨骼主要是哪一类？",
        "options": [
            {"text": "A. 短骨", "correct": False, "feedback": "短骨（如跗骨）能分散压力，但不是主要的支撑杆。"},
            {"text": "B. 长骨", "correct": True, "feedback": "准确！长骨主要分布在四肢，充当杠杆。股骨大转子等是老年人跌倒易骨折的部位。"},
            {"text": "C. 扁骨", "correct": False, "feedback": "扁骨主要用于保护内部器官（如颅骨）。"}
        ]
    },
    {
        "title": "临床复习 3：新生儿颅的特征",
        "desc": "了解人体发育有助于理解骨骼演变。关于新生儿颅骨特征，以下说法正确的是？",
        "options": [
            {"text": "A. 面颅大，脑颅小", "correct": False, "feedback": "相反，新生儿是大脑优先发育，脑颅大。"},
            {"text": "B. 各颅骨间未完全愈合，形成颅囟", "correct": True, "feedback": "正确！最明显的是前囟和后囟，为大脑生长留出空间。"},
            {"text": "C. 鼻旁窦已经完全发育", "correct": False, "feedback": "新生儿鼻旁窦尚未发育。"}
        ]
    },
    {
        "title": "临床复习 4：骨的基本构造",
        "desc": "老年人容易骨折，与骨骼内部结构退化有关。构成一块完整活体骨的主要构造包括？",
        "options": [
            {"text": "A. 只有骨密质和骨松质", "correct": False, "feedback": "这只是骨质部分。"},
            {"text": "B. 骨质、骨膜、骨髓", "correct": True, "feedback": "正确！骨质分密质和松质；骨膜含血管神经；骨髓在髓腔和松质内。"},
            {"text": "C. 无机质和有机质", "correct": False, "feedback": "这是化学成分。"}
        ]
    },
    {
        "title": "临床复习 5：椎骨的一般形态",
        "desc": "在给老人做背部按摩时，能摸到背部正中线上一串突起，这是椎骨的哪一部分？",
        "options": [
            {"text": "A. 椎体", "correct": False, "feedback": "椎体在前方承重，摸不到。"},
            {"text": "B. 横突", "correct": False, "feedback": "横突在两侧向外突出。"},
            {"text": "C. 棘突", "correct": True, "feedback": "正确！向后方伸出的突起即为棘突，在体表可触及。"}
        ]
    },
    {
        "title": "临床复习 6：颈椎的特殊结构",
        "desc": "颈椎病容易压迫椎动脉导致老人头晕。颈椎区别于其他椎骨的最显著特征是什么？",
        "options": [
            {"text": "A. 椎体最大", "correct": False, "feedback": "腰椎的椎体最大。"},
            {"text": "B. 有横突孔", "correct": True, "feedback": "正确！所有颈椎都有横突孔，椎动脉和静脉从中穿过。"},
            {"text": "C. 棘突最长", "correct": False, "feedback": "只有第7颈椎棘突特别长。"}
        ]
    },
    {
        "title": "临床复习 7：胸骨与肋的连接",
        "desc": "心肺复苏按压时需要找准胸骨。胸骨柄与胸骨体连接处微向前突，称为胸骨角。它平对哪一结构？",
        "options": [
            {"text": "A. 第1肋", "correct": False, "feedback": "第1肋在锁骨下方，被锁骨掩盖。"},
            {"text": "B. 第2肋", "correct": True, "feedback": "正确！胸骨角平对第2肋，是临床上计数肋骨的重要标志。"},
            {"text": "C. 第3肋", "correct": False, "feedback": "位置不正确。"}
        ]
    },
    {
        "title": "临床复习 8：骨的化学成分",
        "desc": "为什么小孩子摔跤不容易骨折，而老人轻轻一摔就容易骨折？这与骨的化学成分有关。",
        "options": [
            {"text": "A. 老人骨中有机质增多", "correct": False, "feedback": "有机质提供韧性，老人有机质是减少的。"},
            {"text": "B. 老人骨中无机质比例相对增加", "correct": True, "feedback": "正确！无机质使骨变硬变脆，老人由于钙质虽然流失但总体有机质流失更多，导致脆性增加。"},
            {"text": "C. 老人骨中水分增加", "correct": False, "feedback": "老人体内水分是减少的。"}
        ]
    },
    {
        "title": "临床复习 9：肩胛骨的位置",
        "desc": "老人在穿衣伸臂时肩部疼痛，你观察他的肩胛骨。肩胛骨属于哪类骨，位于胸廓何处？",
        "options": [
            {"text": "A. 扁骨，胸廓后面两侧", "correct": True, "feedback": "正确！肩胛骨是扁骨，贴于胸廓后外面。"},
            {"text": "B. 不规则骨，胸廓前面", "correct": False, "feedback": "前面是胸骨和锁骨。"},
            {"text": "C. 短骨，颈部下方", "correct": False, "feedback": "不是短骨。"}
        ]
    },
    {
        "title": "临床复习 10：脑颅骨与面颅骨",
        "desc": "人的头骨分为脑颅骨和面颅骨。以下哪块骨属于面颅骨？",
        "options": [
            {"text": "A. 额骨", "correct": False, "feedback": "额骨参与构成脑颅腔，保护大脑。"},
            {"text": "B. 颞骨", "correct": False, "feedback": "颞骨在头部两侧，属于脑颅骨。"},
            {"text": "C. 下颌骨", "correct": True, "feedback": "正确！下颌骨参与构成口腔，属于面颅骨，且是唯一可活动的颅骨。"}
        ]
    },
    {
        "title": "临床复习 11：翼点的临床意义",
        "desc": "老人头部太阳穴附近受到侧面撞击非常危险。这个部位被称为“翼点”，它的解剖学特点是什么？",
        "options": [
            {"text": "A. 头骨最厚的部位", "correct": False, "feedback": "相反，它是颅骨最薄弱的部分之一。"},
            {"text": "B. 额、顶、颞、蝶四骨汇合处，内有硬脑膜中动脉前支", "correct": True, "feedback": "正确！此处骨质薄，受撞击极易骨折并撕裂内部的动脉，引起硬膜外血肿，危及生命。"},
            {"text": "C. 是三叉神经的穿出点", "correct": False, "feedback": "不是三叉神经的主要穿出点。"}
        ]
    },
    {
        "title": "临床复习 12：颅中窝的结构",
        "desc": "脑部疾病常涉及特定区域。位于颅底中央，容纳脑垂体（重要内分泌腺）的结构是？",
        "options": [
            {"text": "A. 鸡冠", "correct": False, "feedback": "鸡冠在颅前窝正中。"},
            {"text": "B. 垂体窝（蝶鞍内）", "correct": True, "feedback": "正确！蝶骨体上面的凹陷称为垂体窝，容纳脑垂体。"},
            {"text": "C. 枕骨大孔", "correct": False, "feedback": "在颅后窝。"}
        ]
    },
    {
        "title": "临床复习 13：骨髓的功能",
        "desc": "有些老人的造血功能减弱。关于成人骨髓的分布和功能，正确的是？",
        "options": [
            {"text": "A. 成人所有骨髓均为红骨髓", "correct": False, "feedback": "成人骨干髓腔内转变为黄骨髓。"},
            {"text": "B. 成人由于年龄大，全是黄骨髓不再造血", "correct": False, "feedback": "扁骨和不规则骨中终身保留红骨髓。"},
            {"text": "C. 红骨髓有造血功能，存在于骨松质内", "correct": True, "feedback": "正确！成人椎骨、胸骨等松质网眼内终身保留红骨髓，维持造血功能。"}
        ]
    },
    {
        "title": "临床复习 14：腰椎穿刺定位",
        "desc": "临床上进行腰椎穿刺抽取脑脊液化验，通常选择腰椎之间连线进行，因为腰椎在这个部位的结构特点是？",
        "options": [
            {"text": "A. 棘突细长且向下方倾斜", "correct": False, "feedback": "这是胸椎的特点，呈叠瓦状。"},
            {"text": "B. 棘突宽短呈板状，平伸向后，间隙较宽", "correct": True, "feedback": "正确！腰椎棘突间隙宽，便于针头刺入椎管，且不会损伤脊髓。"},
            {"text": "C. 椎间孔特别大", "correct": False, "feedback": "穿刺从后方棘突间隙进入，不是侧方椎间孔。"}
        ]
    },
    {
        "title": "临床复习 15：真假肋的区分",
        "desc": "胸廓由胸椎、胸骨和肋组成。关于肋的分类，前端借肋软骨直接连于胸骨的称为真肋，它们是指？",
        "options": [
            {"text": "A. 第1~7对肋", "correct": True, "feedback": "正确！第1~7对肋直接与胸骨相连。"},
            {"text": "B. 第8~10对肋", "correct": False, "feedback": "它们连于上一位肋软骨形成肋弓，称假肋。"},
            {"text": "C. 第11~12对肋", "correct": False, "feedback": "前端游离于腹壁肌层中，称浮肋。"}
        ]
    },
    {
        "title": "临床复习 16：人体形态学组成",
        "desc": "《人体形态学》这门课结合了多个学科。其中研究人体器官组织的微细结构及其与功能关系的是？",
        "options": [
            {"text": "A. 人体解剖学", "correct": False, "feedback": "解剖学研究肉眼可见的宏观结构。"},
            {"text": "B. 组织学", "correct": True, "feedback": "正确！组织学主要通过显微镜研究细胞组织的微观结构。"},
            {"text": "C. 胚胎学", "correct": False, "feedback": "胚胎学研究个体发生发展。"}
        ]
    },
    {
        "title": "临床复习 17：解剖学方位词-深浅",
        "desc": "术语“深”和“浅”在解剖学中是如何定义的？",
        "options": [
            {"text": "A. 靠近身体的前面为浅", "correct": False, "feedback": "那是前（腹侧）。"},
            {"text": "B. 靠近皮肤表面为浅，远离表面为深", "correct": True, "feedback": "正确！例如浅筋膜和深筋膜的区别。"},
            {"text": "C. 靠近头部为浅", "correct": False, "feedback": "那是上（颅侧）。"}
        ]
    },
    {
        "title": "临床复习 18：人体的切面",
        "desc": "CT或MRI扫描经常需要看不同切面图像。将人体分为左右相等两半的切面是？",
        "options": [
            {"text": "A. 冠状面", "correct": False, "feedback": "冠状面将身体分为前后两部分。"},
            {"text": "B. 水平面", "correct": False, "feedback": "分为上下两部分。"},
            {"text": "C. 正中矢状面", "correct": True, "feedback": "正确！矢状面将身体分为左右两半，过正中线的即为正中矢状面。"}
        ]
    },
    {
        "title": "临床复习 19：下肢带骨",
        "desc": "连接躯干和下肢的骨骼被称为下肢带骨，在成人它是由哪三块骨愈合而成的？",
        "options": [
            {"text": "A. 髂骨、坐骨、耻骨", "correct": True, "feedback": "正确！这三块骨在软骨化骨后融合为髋骨。"},
            {"text": "B. 股骨、胫骨、腓骨", "correct": False, "feedback": "这是下肢自由骨。"},
            {"text": "C. 骶骨、尾骨、髋骨", "correct": False, "feedback": "骶尾骨属于躯干骨。"}
        ]
    },
    {
        "title": "临床复习 20：颅内最主要的枕骨结构",
        "desc": "颅后窝有一大孔，脑干通过此孔与脊髓相连。这是什么结构？",
        "options": [
            {"text": "A. 破裂孔", "correct": False, "feedback": "较小，有血管神经通过。"},
            {"text": "B. 颈静脉孔", "correct": False, "feedback": "有脑神经和颈静脉通过。"},
            {"text": "C. 枕骨大孔", "correct": True, "feedback": "正确！延髓在此处向下延续为脊髓，非常关键。"}
        ]
    },
    {
        "title": "临床复习 21：腕骨的分类",
        "desc": "老人跌倒时常常用手撑地，导致腕部受伤。腕骨共有8块，从形态上看它们属于？",
        "options": [
            {"text": "A. 短骨", "correct": True, "feedback": "正确！短骨近似立方形，成群分布，利于运动并分散冲击力。"},
            {"text": "B. 长骨", "correct": False, "feedback": "长骨起杠杆作用。"},
            {"text": "C. 不规则骨", "correct": False, "feedback": "椎骨是不规则骨。"}
        ]
    },
    {
        "title": "临床复习 22：鼻旁窦的位置",
        "desc": "老人感冒时常说头痛，可能是鼻旁窦炎引起的。以下哪块骨内部不含鼻旁窦？",
        "options": [
            {"text": "A. 上颌骨", "correct": False, "feedback": "含有最大的上颌窦。"},
            {"text": "B. 额骨", "correct": False, "feedback": "含有额窦。"},
            {"text": "C. 下颌骨", "correct": True, "feedback": "正确！下颌骨内没有含气空腔，鼻旁窦主要位于上颌骨、额骨、蝶骨和筛骨内。"}
        ]
    },
    {
        "title": "临床复习 23：髌骨的作用",
        "desc": "膝关节前方有一块骨，老人经常由于软骨磨损导致此处疼痛。这块骨是？",
        "options": [
            {"text": "A. 腓骨", "correct": False, "feedback": "在小腿外侧。"},
            {"text": "B. 髌骨", "correct": True, "feedback": "正确！髌骨是人体最大的籽骨，包含在股四头肌腱内，起保护膝关节和增加肌肉力学效应的作用。"},
            {"text": "C. 胫骨", "correct": False, "feedback": "在小腿内侧承重。"}
        ]
    },
    {
        "title": "临床复习 24：隆椎的定位",
        "desc": "医生在计数棘突时，常以颈部后面最明显的一个棘突作为标志，它是？",
        "options": [
            {"text": "A. 第7颈椎（隆椎）", "correct": True, "feedback": "正确！第7颈椎的棘突特别长，末端不分叉，低头时最隆起，是重要的体表标志。"},
            {"text": "B. 第1颈椎（寰椎）", "correct": False, "feedback": "没有椎体和棘突。"},
            {"text": "C. 第2颈椎（枢椎）", "correct": False, "feedback": "其上方有齿突，但棘突不是最明显的。"}
        ]
    },
    {
        "title": "临床复习 25：脊柱的生理弯曲",
        "desc": "正常成年人的脊柱从侧面看有四个生理弯曲，其中向后凸的弯曲是？",
        "options": [
            {"text": "A. 颈曲和腰曲", "correct": False, "feedback": "这两个弯曲是向前凸的。"},
            {"text": "B. 胸曲和骶曲", "correct": True, "feedback": "正确！胸骨和骶部呈向后凸的弯曲，增加了躯干的容量。"},
            {"text": "C. 全都是向后凸", "correct": False, "feedback": "有前凸有后凸才能像弹簧一样缓冲震荡。"}
        ]
    },
    {
        "title": "临床复习 26：上肢骨的数量",
        "desc": "人体附肢骨由上下肢组成，非常灵活。一侧上肢骨的数量总共有多少块？",
        "options": [
            {"text": "A. 32块", "correct": True, "feedback": "正确！一侧上肢带骨2块(锁骨/肩胛骨)+自由肢骨30块(肱1/桡1/尺1/腕8/掌5/指14)=32块。两侧共64块。"},
            {"text": "B. 31块", "correct": False, "feedback": "数量不对。"},
            {"text": "C. 62块", "correct": False, "feedback": "这是双侧下肢骨的总数。"}
        ]
    },
    {
        "title": "临床复习 27：骨性鼻中隔的组成",
        "desc": "很多老人会有鼻中隔偏曲导致呼吸不畅。构成骨性鼻中隔的骨主要是？",
        "options": [
            {"text": "A. 上颌骨和腭骨", "correct": False, "feedback": "参与构成硬腭。"},
            {"text": "B. 筛骨垂直板和犁骨", "correct": True, "feedback": "正确！这两块骨形成鼻腔正中的骨性间隔。"},
            {"text": "C. 鼻骨和下鼻甲", "correct": False, "feedback": "鼻骨在鼻背，下鼻甲在侧壁。"}
        ]
    },
    {
        "title": "临床复习 28：骨折修复",
        "desc": "老年人发生骨折后愈合非常缓慢。骨骼哪一部分的细胞对骨的生长和骨折修复起到了决定性作用？",
        "options": [
            {"text": "A. 骨松质的红骨髓", "correct": False, "feedback": "负责造血。"},
            {"text": "B. 骨膜中的成骨细胞", "correct": True, "feedback": "正确！骨膜尤其内层富含成骨细胞和破骨细胞，控制着骨的修复、重建和加粗。"},
            {"text": "C. 关节软骨", "correct": False, "feedback": "覆盖在关节面，无修复骨干的作用。"}
        ]
    },
    {
        "title": "临床复习 29：骨性口腔的顶",
        "desc": "有些老人的假牙是上颚全托。假牙贴合的骨性硬腭主要是由哪些骨构成的？",
        "options": [
            {"text": "A. 蝶骨和筛骨", "correct": False, "feedback": "这在颅底更深和靠上的位置。"},
            {"text": "B. 额骨和鼻骨", "correct": False, "feedback": "在面部上方前方。"},
            {"text": "C. 上颌骨腭突和腭骨水平板", "correct": True, "feedback": "正确！这两个部分共同构成骨性口腔的顶（即骨性鼻腔的底）。"}
        ]
    },
    {
        "title": "临床复习 30：总复习：全身体积与承重",
        "desc": "在人体的所有骨骼中，哪一块骨头不仅最长、最结实，一旦中老年人跌倒导致其颈部骨折，常被称为“人生最后一次骨折”？",
        "options": [
            {"text": "A. 胫骨", "correct": False, "feedback": "胫骨虽粗壮并承重，但不是最长的，也不被此称呼。"},
            {"text": "B. 股骨", "correct": True, "feedback": "完全正确！股骨是人体最长最结实的骨。老年人极易发生股骨颈骨折，由于长时间卧床常引发致死并发症，因此被称为“人生最后一次骨折”。"},
            {"text": "C. 肱骨", "correct": False, "feedback": "这是上肢骨，不承重躯干。"}
        ]
    }
]

# Write to a compact JS format for replacement
js_str = "    cases: [\n"
for i, q in enumerate(questions):
    js_str += f"        {{\n            title: {json.dumps(q['title'])},\n            desc: {json.dumps(q['desc'])},\n            options: [\n"
    for j, opt in enumerate(q['options']):
        comma = "," if j < len(q['options']) - 1 else ""
        text = json.dumps(opt['text'], ensure_ascii=False)
        corr = "true" if opt['correct'] else "false"
        fb = json.dumps(opt['feedback'], ensure_ascii=False)
        js_str += f"                {{ text: {text}, correct: {corr}, feedback: {fb} }}{comma}\n"
    comma = "," if i < len(questions) - 1 else ""
    js_str += f"            ]\n        }}{comma}\n"
js_str += "    ],"

with open("e:\\project\\analysis\\cases_snippet.txt", "w", encoding="utf-8") as f:
    f.write(js_str)
