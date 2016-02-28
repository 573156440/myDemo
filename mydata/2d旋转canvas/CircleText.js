/**
 * Created by Qinson on 2015/12/24.
 */
function CircleText(option){
    this._init(option);
}
CircleText.prototype={
    _init: function (option) {
        this.x = option.x || 0;      //Բ��������ĵ�����
        this.y = option.y || 0;
        this.innerRadius = option.innerRadius || 0;
        this.outerRadius = option.outerRadius || 0;
        this.text = option.text || 'canvas';
        this.innerStyle = option.innerStyle || 'red';
        this.outerStyle = option.outerStyle || 'blue';
        //�������ֺ�Բ�ε�һ����
        this.group = new Konva.Group({
            x: this.x,     //�������x y��������е��ڲ�Ԫ�ذ����������궨λ
            y: this.y
        });
        //��ʼ��һ���ڲ�Բ
        var innerCircle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this.innerRadius,  //Բ�İ뾶
            fill: this.innerStyle,
            opacity: .8
        });
        //���ڲ�Բ��ӵ�����
        this.group.add(innerCircle);
        //��ʼ��һ��Բ��
        var outerRing =new Konva.Ring({
            x: 0,
            y: 0,
            innerRadius: this.innerRadius,
            outerRadius: this.outerRadius,
            fill: this.outerStyle,
            opacity: .3
        });
        //���⻷����ӵ�����
        this.group.add( outerRing );

        //��ʼ��һ������
        var text = new Konva.Text({
            x: 0 - this.outerRadius,
            y: -7,
            width: this.outerRadius * 2,//���ֵĿ��
            fill: '#fff',			    //���ֵ���ɫ
            fontSize: 17,				//���ֵĴ�С
            text: this.text,			//���ֵ�����
            align: 'center',			//������ʾ
            fontStyle: 'bold'			//����Ӵ�
        });

        //��������ӵ�����
        this.group.add( text );

    },
    //�� ����ӵ�������������С�
    addToGroupOrLayer: function( arg ) {
        arg.add( this.group );
    }
}