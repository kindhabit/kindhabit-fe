import { useEffect, useState } from 'react';
import { CardContainer } from '@/components/common/Card/Card_styles';

const hospitalImages = import.meta.glob('@/assets/hospital/*.(jpg|png|jpeg)', { eager: true }) as Record<string, { default: string }>;

      <CardContainer $type="hospital-A">
        <div className="thumbnail">
          <img 
            src={hospitalImages[`/src/assets/hospital/${hospital.id}.jpg`]?.default || 
                 hospitalImages[`/src/assets/hospital/${hospital.id}.png`]?.default || 
                 hospitalImages[`/src/assets/hospital/${hospital.id}.jpeg`]?.default}
            alt={hospital.name}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="fallback hidden">{hospital.id}</div>
        </div>
        <div className="content">
          <h3 className="title">{hospital.name}</h3>
          <p className="subtitle">{hospital.address}</p>
          <div className="tags">
            {hospital.availableCheckups.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </CardContainer> 