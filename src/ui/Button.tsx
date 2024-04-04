import { Button }from 'antd';
import { useState } from 'react';

const HeroButton: React.FC = (props) => {
    
    const [size, setSize] = useState<SizeType>('large');

    return (
        <>
            <Button type="primary" size={size} href='/addcampaign'>
                Войти
          </Button>
        </>
    )
}

export default HeroButton