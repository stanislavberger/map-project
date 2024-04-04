import { Button }from 'antd';
import { useState } from 'react';
import type { ConfigProviderProps } from 'antd';


const HeroButton: React.FC = () => {
    
    type SizeType = ConfigProviderProps['componentSize'];

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